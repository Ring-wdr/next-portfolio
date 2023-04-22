"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavMenu } from "./NavMenu";
import styles from "./navbar.module.css";

export const NavBar = () => {
  const btnRef = useRef<HTMLInputElement>(null);
  const rmMenu = () => {
    if (btnRef.current) btnRef.current.checked = false;
  };
  useEffect(() => {
    window.addEventListener("scroll", rmMenu);
    return () => window.removeEventListener("scroll", rmMenu);
  }, []);

  return (
    <nav className={styles.wrapper}>
      <div className={styles.nav}>
        <input
          ref={btnRef}
          onScroll={rmMenu}
          id="menu-toggle"
          type="checkbox"
          hidden
        />
        <label
          className={styles["menu-button-container"]}
          htmlFor="menu-toggle"
        >
          <div className={styles["menu-button"]}></div>
        </label>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/icon/apple-icon-60x60.png"
              alt="logo"
              width={60}
              height={60}
              className={styles.logo}
            />
          </Link>
          <div className="d-flex flex-column justify-sb">
            <span>Ring-Wdr</span>
            <span>Personal</span>
          </div>
        </div>
        <NavMenu onClose={rmMenu} />
      </div>
    </nav>
  );
};
