import {
  useState,
} from 'react';

import qs from 'query-string';

import { AuthKeys } from '../constants/auth/authKeys';

export type IIdentityServer = {
  loginUrl: string,
  authUrl: string,
  codeChallengeMethod: string,
  clientId: string,
  redirectUri?: string,
  scope?: string,
  audience: string,
  responseType: string,
}

export type TAuthResponse = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
};

const useAuth = (ids: IIdentityServer) => {
  const [idsConfig] = useState(ids);

  const signInWithRedirectAsync = async () => {
    const state = getRandomString(32);
    const verifier = getCodeVerifier();
    const challenge = await getCodeChallengeAsync(verifier);

    let loginUrl = `${idsConfig.loginUrl}?`;
    loginUrl += `response_type=${encodeURIComponent(idsConfig.responseType)}`;
    loginUrl += `&client_id=${encodeURIComponent(idsConfig.clientId)}`;
    loginUrl += `&code_challenge=${encodeURIComponent(challenge)}`;
    loginUrl += `&code_challenge_method=${encodeURIComponent(idsConfig.codeChallengeMethod)}`;
    loginUrl += `&redirect_uri=${encodeURIComponent(window.location.origin)}`;
    loginUrl += `&state=${encodeURIComponent(state)}`;

    localStorage.setItem(AuthKeys.PKCE_STATE_TAG, state);
    localStorage.setItem(AuthKeys.PKCE_CODE_VERIFIER_TAG, verifier);

    window.location.href = loginUrl;
  }

  const authenticate = async ({code, state}) => {
    const localState = localStorage.getItem(AuthKeys.PKCE_STATE_TAG);
    const localVerifier = localStorage.getItem(AuthKeys.PKCE_CODE_VERIFIER_TAG);

    if (!(localState && localVerifier)) {
      return;
    }

    if (state === localState) {
      const tokenUri = idsConfig.authUrl;

      const payload = {
        grant_type: 'authorization_code',
        code: code,
        client_id: idsConfig.clientId,
        redirect_uri: window.location.origin,
        code_verifier: localVerifier,
      };

      const response = await fetch(tokenUri, {
        method: 'post',
        headers: {
          Accept: AuthKeys.AUTH_API_ACCEPT,
          'Content-Type': AuthKeys.AUTH_API_CTYPE,
        },
        body: qs.stringify(payload),
      });

      const data = await response.json();

      if (data?.['id_token']) {
        localStorage.setItem(AuthKeys.AUTH_TAG, data);
      }
    }

    cleanChallengesAsync();
    window.history.replaceState({}, '', '/');
  }

  return { signInWithRedirectAsync, authenticate };
}

function getRandomString(length: number): string {
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ('0' + dec.toString(16)).substr(-2)).join('');
}

function getCodeVerifier(): string {
  return getRandomString(28);
}

function base64URLEncode(str: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(str))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sha256Async(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

async function getCodeChallengeAsync(codeVerifier: string): Promise<string> {
  const challenge = await sha256Async(codeVerifier);
  return base64URLEncode(challenge);
}

function cleanChallengesAsync() {
  localStorage.removeItem(AuthKeys.PKCE_STATE_TAG);
  localStorage.removeItem(AuthKeys.PKCE_CODE_VERIFIER_TAG);
}

export default useAuth;