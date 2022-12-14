import '../styles/global.scss'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import styles from '../styles/app.module.scss'
import { PlayerContextProvider } from '../contexts/PlayerContext'
import { Provider } from '@lyket/react'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <PlayerContextProvider>
        <Provider apiKey={process.env.API_KEY_LYKET}>
          <div className={styles.wrapper}>
            <main>
              <Header />
              <Component {...pageProps} />
            </main>
            <Player />
          </div>
        </Provider>
      </PlayerContextProvider>
      <Analytics />
    </>
  )
}

export default MyApp
