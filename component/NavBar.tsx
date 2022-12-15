import Image from 'next/image';
import Link from 'next/link';
import styles from './css/navbar.module.css';
import 'remixicon/fonts/remixicon.css';
import { useState } from 'react';

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
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
            <Link href={`/`}>HOME</Link>
          </li>
          <li>
            <Link href={`/project`}>PROJECT</Link>
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
