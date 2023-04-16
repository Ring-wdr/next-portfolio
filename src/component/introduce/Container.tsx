"use client";

import { useInterObs } from "@/hooks/useInterObs";
import Link from "next/link";
import { useRef } from "react";
import { Button, IconWrapper, Modal } from "../common";
import styles from "./container.module.css";

export const Container = () => {
  const githubRef = useRef<HTMLDialogElement>(null);
  const instaRef = useRef<HTMLDialogElement>(null);
  const onGithubClick = () => githubRef.current?.showModal();
  const onInstaClick = () => instaRef.current?.showModal();
  const { ref: shortRef, inView } = useInterObs<HTMLParagraphElement>();
  return (
    <>
      <div>
        <div className={styles.welcome}>
          Hi,
          <br /> Welcome to PORTFOLIO
          <br /> of Ring-Wdr
        </div>
        <p
          ref={shortRef}
          className={`${styles["short-desc"]} ${inView ? styles.show : ""}`}
        >
          and I&apos;m FrondEnd Developer
        </p>

        <div className={styles.contact}>
          <div className="d-flex mb-1">
            <IconWrapper className="mr-1" onClick={onGithubClick}>
              <i className="ri-github-fill"></i>
            </IconWrapper>
            <IconWrapper onClick={onInstaClick}>
              <i className="ri-instagram-line"></i>
            </IconWrapper>
          </div>
          <Button className="w-15 mt-1 mb-2" onClick={onInstaClick}>
            Contact me!
          </Button>
        </div>
      </div>
      <Modal ref={githubRef}>
        <Link
          href="https://github.com/Ring-wdr"
          target="_blank"
          rel="noopener noreferrer"
          className="d-flex flex-column align-ic"
        >
          MOVE TO MY <br />
          <i className="ri-github-fill mt-1 font-20"></i>
        </Link>
        <form method="dialog">
          <button>BACK</button>
        </form>
      </Modal>
      <Modal ref={instaRef}>
        비공개입니다.
        <form method="dialog">
          <button>BACK</button>
        </form>
      </Modal>
    </>
  );
};
