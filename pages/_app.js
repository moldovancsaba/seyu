import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>bFound - Find What Matters</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="bFound helps you find your lost items using advanced technology and a community-driven approach." />
        <link rel="icon" href="/favicon.ico" />
        {/* Add Open Graph meta tags for better social sharing */}
        <meta property="og:title" content="bFound - Find What Matters" />
        <meta property="og:description" content="Find your lost items using advanced technology and a community-driven approach." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bfound.com" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
