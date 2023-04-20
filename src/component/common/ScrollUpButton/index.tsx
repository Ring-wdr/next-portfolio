"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";

export const ScrollUpButton = () => {
  const [btnStatus, setStatus] = useState(false);

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setStatus(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    const handleFlow = () => {
      timer && clearTimeout(timer);
      setStatus(true);
      timer = setTimeout(() => setStatus(false), 1000);
    };
    window.addEventListener("scroll", handleFlow);
    return () => window.removeEventListener("scroll", handleFlow);
  }, []);

  return (
    <button
      className={`${styles["scroll-top-btn"]} ${
        btnStatus ? "" : styles.inactive
      }`}
      onClick={handleTop}
    >
      ⇪
    </button>
  );
};
