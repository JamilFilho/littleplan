import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
          <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
          <meta name="application-name" content="Little Plan" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Little Plan" />
          <meta name="description" content="Leia a Bíblia em 365 dias" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#3B75D3" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#3B75D3" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-icon-167.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180.png" />

          <link rel="manifest" href="/manifest.json"/>
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}