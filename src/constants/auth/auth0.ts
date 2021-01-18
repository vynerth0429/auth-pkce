import { IIdentityServer } from '../../hooks/useAuth';

export const Auth0Setting: IIdentityServer = {
  tag: 'auth0',
  loginUrl: 'https://reylab.eu.auth0.com/authorize',
  authUrl: 'https://reylab.eu.auth0.com/oauth/token',
  userInfoUrl: 'https://reylab.eu.auth0.com/userinfo',
  codeChallengeMethod: 'S256',
  clientId: 'fFuGZ7ynVLt6HxjSjs1jaTwC3Td7YfIo',
  clientSecret: '1FmO0Kvu-mQ9mB3p-0ohjvAplxFYsjKfAz6PI-lgWXbCnun7qounqJIiOLOmspse',
  redirectUri: '',
  scope: 'openid profile email offline_access',
  audience: 'appointments:api',
  responseType: 'code'
}
