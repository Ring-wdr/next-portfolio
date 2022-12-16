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
        <meta
          property='og:url'
          content='https://next-portfolio-ringring.vercel.app/'
        />
        <meta property='og:title' content='김만중: 포트폴리오 페이지' />
        <meta
          property='og:description'
          content='프론트엔드 개발자 김만중의 포트폴리오 페이지입니다.'
        />
        <meta
          property='og:image'
          content='https://avatars.githubusercontent.com/u/70439662?s=96&v=4'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
