import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

import styles from './../styles/Home.module.scss'
import { Auth0Setting } from '../constants/auth/auth0';
import { AzureSetting } from '../constants/auth/azure';

import useAuth, { IIdentityServer } from '../hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { signInWithRedirectAsync, authenticate } = useAuth();

  useEffect(() => {
    const { code, state } = router.query;
    if (code && state) {
      authenticate({code, state});
    }
  }, [router.query])

  const login = (ids: IIdentityServer) => {
    signInWithRedirectAsync(ids);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/vynerth0429/auth-pkce">auth-pkce!</a>
        </h1>

        <p className={styles.description}>
          The next level auth. 😎
        </p>

        <div className={styles.grid}>
          <a className={styles.card}
            onClick={() => login(Auth0Setting)}>
            <h3>Auth0 Login &rarr;</h3>
            <p>Authenticate via Auth0 authorization server</p>
          </a>

          <a className={styles.card}
            onClick={() => login(AzureSetting)}>
            <h3>Azure Login &rarr;</h3>
            <p>Authenticate via Azure authorization server.</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>AWS Login &rarr;</h3>
            <p>Authenticate via AWS authorization server.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
