import Image from "next/image";
import Link from "next/link";
import { navLinkList } from "../../lib/route";
import styles from "./navbar.module.css";

export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image
          src="/icon/apple-icon-60x60.png"
          alt="logo"
          width={60}
          height={60}
          className={styles.logo}
        />
        <div className="d-flex flex-column justify-sb">
          <span>Ring-Wdr</span>
          <span>Personal</span>
        </div>
      </div>
      <ul className={[styles["nav-link"], "align-ic"].join(" ")}>
        {navLinkList.map(([key, route, label]) => (
          <Link href={route} key={key}>
            <li>{label}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
