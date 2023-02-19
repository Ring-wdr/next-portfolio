import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from './css/navbar.module.css';
import 'remixicon/fonts/remixicon.css';

const idxArr: [number, string, string][] = [
  [1, '/', 'HOME'],
  [2, '/project', 'PROJECT'],
  [3, '/calendar', 'CALENDAR'],
];

export default function NavBar() {
  const router = useRouter();
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
          className={`${styles['logo-btn']} ${toggle ? styles.active : ''} `}
        >
          {toggle ? (
            <i className='ri-menu-4-line'></i>
          ) : (
            <i className='ri-menu-line'></i>
          )}
        </button>
        <Image src='/ms-icon-150x150.png' alt='logo' width={50} height={50} />
        <div className={styles['logo-name']}>RING-WDR</div>
      </div>
      <div className={`${styles['nav-ref']} ${toggle ? '' : styles.inactive}`}>
        <ul>
          {idxArr.map(([key, route, label]) => (
            <li key={key}>
              <Link
                href={route}
                style={{
                  color: router.pathname === route ? 'crimson' : 'inherit',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
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
