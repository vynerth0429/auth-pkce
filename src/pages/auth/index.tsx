import React, { useEffect } from 'react';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import useAuth from '../../hooks/useAuth';
import { Auth0Setting } from '../../constants/auth/auth0';

function AuthContent() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const { signInWithRedirectAsync } = useAuth(Auth0Setting);

  useEffect(() => {
    console.log('isAuthenticated ->', isAuthenticated);
  }, [isAuthenticated])

  useEffect(() => {
    console.log('user ->', user);
  }, [user])

  return (
    <div>
      <h1>
        Auth0
      </h1>

      <button onClick={() => signInWithRedirectAsync()}>Log In</button>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
      <>
        {
          isAuthenticated && (
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          )
        }
      </>
    </div>
  )
}

function Auth() {
  return (
    <AuthContent />
    // <Auth0Provider
    //   domain="reylab.eu.auth0.com"
    //   clientId="fFuGZ7ynVLt6HxjSjs1jaTwC3Td7YfIo"
    //   redirectUri={(typeof window !== "undefined") ? window.location.origin : undefined }
    //   >
    //   <AuthContent />
    // </Auth0Provider>
  )
}

export default Auth;
