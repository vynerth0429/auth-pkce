import { IIdentityServer } from '../../hooks/useAuth';

const tenantId = '07d1e4be-536e-4d0a-9d0e-88501e9b0c59';

export const AzureSetting: IIdentityServer = {
  tag: 'azure',
  loginUrl: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`,
  authUrl: `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
  codeChallengeMethod: 'S256',
  clientId: 'd1b90889-ae68-448c-9f1a-194d8f549574',
  redirectUri: '',
  scope: 'openid profile User.Read',
  audience: 'appointments:api',
  responseType: 'code'
}
