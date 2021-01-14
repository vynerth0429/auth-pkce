import { IIdentityServer } from '../../hooks/useAuth';

export const AWSSetting: IIdentityServer = {
  tag: 'aws-cognito',
  loginUrl: `https://auth-pkce.auth.us-east-2.amazoncognito.com/oauth2/authorize`,
  authUrl: `https://auth-pkce.auth.us-east-2.amazoncognito.com/oauth2/token`,
  codeChallengeMethod: 'S256',
  clientId: '3lgh4ogpt4t4cf03upjo5shu4r',
  clientSecret: '1ksc2sno9f9o7sgn76j6k93m3tladhs6hu016ji7uhsf7keebld4',
  redirectUri: '',
  scope: 'openid profile email phone',
  audience: 'appointments:api',
  responseType: 'code'
}
