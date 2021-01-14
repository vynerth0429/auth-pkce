import {
  useState,
} from 'react';

import qs from 'query-string';

import { AuthKeys } from '../constants/auth/authKeys';

export type IIdentityServer = {
  tag: string,
  loginUrl: string,
  authUrl: string,
  codeChallengeMethod: string,
  clientId: string,
  clientSecret?: string,
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

const useAuth = () => {
  const signInWithRedirectAsync = async (ids: IIdentityServer) => {
    const state = getRandomString(32);
    const verifier = getCodeVerifier();
    const challenge = await getCodeChallengeAsync(verifier);

    let loginUrl = `${ids.loginUrl}?`;
    loginUrl += `response_type=${encodeURIComponent(ids.responseType)}`;
    loginUrl += `&client_id=${encodeURIComponent(ids.clientId)}`;
    loginUrl += `&code_challenge=${encodeURIComponent(challenge)}`;
    loginUrl += `&code_challenge_method=${encodeURIComponent(ids.codeChallengeMethod)}`;
    loginUrl += `&redirect_uri=${encodeURIComponent(window.location.origin)}`;
    loginUrl += `&state=${encodeURIComponent(state)}`;
    loginUrl += `&scope=${encodeURIComponent(ids.scope)}`;

    localStorage.setItem(AuthKeys.PKCE_STATE_TAG, state);
    localStorage.setItem(AuthKeys.PKCE_CODE_VERIFIER_TAG, verifier);
    localStorage.setItem(AuthKeys.PKCE_IDENTITY_SERVER, JSON.stringify(ids));

    window.location.href = loginUrl;
  }

  const authenticate = async ({code, state}) => {
    const localState = localStorage.getItem(AuthKeys.PKCE_STATE_TAG);
    const localVerifier = localStorage.getItem(AuthKeys.PKCE_CODE_VERIFIER_TAG);
    const localIDS = JSON.parse(localStorage.getItem(AuthKeys.PKCE_IDENTITY_SERVER)) as IIdentityServer;

    console.log('localIDS ->', localIDS);

    if (!(localState && localVerifier && localIDS)) {
      return;
    }

    if (state === localState) {
      const tokenUri = localIDS.authUrl;

      const payload = {
        grant_type: 'authorization_code',
        code: code,
        client_id: localIDS.clientId,
        redirect_uri: window.location.origin,
        code_verifier: localVerifier,
        client_secret: localIDS.clientSecret ? localIDS.clientSecret : null
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

      console.log('DATA ->', data);

      if (data?.['id_token']) {
        localStorage.setItem(localIDS.tag, JSON.stringify(data));
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