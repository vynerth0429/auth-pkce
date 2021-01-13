import { IIdentityServer } from '../../hooks/useAuth';

export const Auth0Setting: IIdentityServer = {
  loginUrl: 'https://reylab.eu.auth0.com/authorize',
  authUrl: 'https://reylab.eu.auth0.com/oauth/token',
  codeChallengeMethod: 'S256',
  clientId: 'fFuGZ7ynVLt6HxjSjs1jaTwC3Td7YfIo',
  redirectUri: '',
  scope: 'profile email',
  audience: 'appointments:api',
  responseType: 'code'
}
