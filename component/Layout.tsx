import NavBar from './NavBar';
import styles from './css/layout.module.css';
import Head from 'next/head';
import { useRef } from 'react';
import { Modal } from './Modal';

export default function Layout({ children }: React.PropsWithChildren) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const onClick = () => {
    modalRef.current?.showModal();
  };
  return (
    <div className={styles.body}>
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
      <NavBar onClick={onClick} />
      <Modal ref={modalRef} />
      {children}
    </div>
  );
}
