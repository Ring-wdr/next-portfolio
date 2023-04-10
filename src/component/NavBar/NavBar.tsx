"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { navLinkList } from "../../lib/route";
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
            <Link href={route} key={key} onClick={rmMenu}>
              <li>{label}</li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};
