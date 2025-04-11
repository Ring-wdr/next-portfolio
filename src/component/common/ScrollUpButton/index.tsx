"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";
import clsx from "clsx";

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
    let timer: NodeJS.Timeout;
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
      className={clsx(styles["scroll-top-btn"], !btnStatus && styles.inactive)}
      onClick={handleTop}
    >
      <i className="ri-arrow-up-circle-fill font-20"></i>
    </button>
  );
};
