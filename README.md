## About

This is a WIP proof-of-concept React hook authentication using the OAuth 2.0 authorization code flow. Allowing developers to use authentication from different major identity providers - **Auth0**, **AWS** and **Azure**.

**Auth-pkce hook** provides the following methods:

1. *signInWithRedirectAsync*
2. *authenticate*

---
#### 1. signInWithRedirectAsync
```
(ids: IIdentityServer) => void
```

This will redirect the user to the authentication UI provided by the chosen Identity Provider.

The following query parameters are attached to the authorazation link:
```bash
response_type
client_id
code_challenge
code_challenge_method
redirect_uri
state
scope
```

Identity Provider will then redirect the user to the provided **redirect_uri** with the **code** and **state** attached as query parameters.

#### 2. authenticate
```
({code, state}) => void
```

This will attempt to connect with the Login API of the Identity Provider which returns authorization data like **authorization token** and **refresh token**.

###### Payload
```bash
const payload = {
  grant_type,
  code: code,
  client_id,
  redirect_uri,
  code_verifier,
  client_secret,
};
```
***

#### Types
###### IIdentityServer Interface
```bash
export interface IIdentityServer {
  tag: string,
  loginUrl: string,
  authUrl: string,
  userInfoUrl: string,
  codeChallengeMethod: string,
  clientId: string,
  clientSecret?: string,
  redirectUri?: string,
  scope?: string,
  audience: string,
  responseType: string,
}
```