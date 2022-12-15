import Image from 'next/image';
import Link from 'next/link';
import styles from './css/navbar.module.css';
import 'remixicon/fonts/remixicon.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  const [toggle, setToggle] = useState(false);
  const removeNav = () => setToggle(false);

  useEffect(() => {
    window.addEventListener('scroll', removeNav);

    return () => window.removeEventListener('scroll', removeNav);
  }, [toggle]);

  return (
    <nav className={styles['nav-bar']}>
      <div className={styles['logo-box']}>
        <button
          onClick={() => setToggle((prev) => !prev)}
          className={styles['logo-btn']}
        >
          <Image src='/ms-icon-150x150.png' alt='logo' width={50} height={50} />
        </button>
        <span className={styles['logo-name']}>RING-WDR</span>
      </div>
      <div className={`${styles['nav-ref']} ${toggle ? '' : styles.inactive}`}>
        <ul>
          <li>
            <Link
              href={`/`}
              style={{ color: router.pathname === '/' ? 'crimson' : 'inherit' }}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              href={`/project`}
              style={{
                color: router.pathname === '/project' ? 'crimson' : 'inherit',
              }}
            >
              PROJECT
            </Link>
          </li>
        </ul>
        <div className={styles['nav-github']}>
          <a
            href='https://github.com/Ring-wdr'
            target='_blank'
            rel='noopener noreferrer'
          >
            GO TO Github &nbsp;<i className='ri-github-fill'></i>
          </a>
        </div>
      </div>
    </nav>
  );
}
