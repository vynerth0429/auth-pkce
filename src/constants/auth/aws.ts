import { IIdentityServer } from '../../hooks/useAuth';

export const AWSSetting: IIdentityServer = {
  tag: 'aws-cognito',
  loginUrl: `https://auth-pkce.auth.us-east-2.amazoncognito.com/authorize`,
  authUrl: `https://auth-pkce.auth.us-east-2.amazoncognito.com/login`,
  codeChallengeMethod: 'S256',
  clientId: '3lgh4ogpt4t4cf03upjo5shu4r',
  redirectUri: '',
  scope: 'openid profile email phone',
  audience: 'appointments:api',
  responseType: 'code'
}
