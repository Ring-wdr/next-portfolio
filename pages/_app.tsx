import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../component/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>포트폴리오</title>
        <meta name='김밥을 마는 포트폴리오' content='next 죄고' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
