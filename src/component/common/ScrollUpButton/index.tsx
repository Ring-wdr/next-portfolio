"use client";

import { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";

const fadeout = stylex.keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

const scrollButtonStyle = stylex.create({
  button: {
    position: "fixed",
    bottom: 100,
    right: 50,
    zIndex: 5,
    width: 50,
    height: 50,
    background: "rgba(159, 159, 159, 0.5)",
    border: "none",
    borderRadius: 100,
    transition: "0.5s ease",
  },
  inactive: {
    visibility: "hidden",
    animationName: fadeout,
    animationDuration: "1s",
    animationFillMode: "forwards",
  },
});

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
      {...stylex.props(
        scrollButtonStyle.button,
        !btnStatus && scrollButtonStyle.inactive
      )}
      onClick={handleTop}
    >
      <i className="ri-arrow-up-circle-fill font-20"></i>
    </button>
  );
};
