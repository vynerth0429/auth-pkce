import '../styles/globals.scss'
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="reylab.eu.auth0.com"
      clientId="fFuGZ7ynVLt6HxjSjs1jaTwC3Td7YfIo"
      redirectUri={(typeof window !== "undefined") ? window.location.origin : undefined }
      >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
