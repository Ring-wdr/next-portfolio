"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next-intl/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { NavMenu } from "./NavMenu";
import LocaleSwitcher from "../LocaleSwitcher";
import styles from "./navbar.module.css";

export const NavBar = () => {
  const locale = useLocale();
  const btnRef = useRef<HTMLInputElement>(null);
  const rmMenu = useCallback(() => {
    if (btnRef.current) btnRef.current.checked = false;
  }, []);
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
        <LocaleSwitcher />
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/icon/apple-icon-60x60.png"
              alt="logo"
              width={60}
              height={60}
            />
          </Link>
          <div className="d-flex flex-column justify-sb">
            <span>Ring-Wdr</span>
            <span>Personal</span>
          </div>
        </div>
        <NavMenu locale={locale} onClose={rmMenu} />
      </div>
    </nav>
  );
};
