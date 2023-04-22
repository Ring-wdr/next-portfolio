"use client";

import { useReducer } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button, IconWrapper, Modal, toggleReducer } from "../common";
import { useInterObs } from "@/hooks/useInterObs";
import styles from "./container.module.css";

const DynamicEmailSender = dynamic(() => import("./EmailSender"), {
  ssr: false,
});

const initValue = {
  github: false,
  instagram: false,
  sendEmail: false,
};

export const Container = () => {
  const [{ github, instagram, sendEmail }, dispatch] = useReducer(
    toggleReducer<typeof initValue>,
    initValue
  );
  const onGithubClick = () => dispatch({ type: "github" });
  const onInstaClick = () => dispatch({ type: "instagram" });
  const onSendEmail = () => dispatch({ type: "sendEmail" });
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
          <Button className="w-15 mt-1 mb-2" onClick={onSendEmail}>
            Contact me!
          </Button>
        </div>
      </div>
      <Modal isOpen={github} onClose={onGithubClick}>
        <div className="w-15 mt-1">
          <Link
            href="https://github.com/Ring-wdr"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex flex-column align-ic"
          >
            MOVE TO MY GITHUB
            <i className="ri-github-fill mt-1 font-20"></i>
          </Link>
          <div className="text-center">
            <button onClick={onGithubClick}>BACK</button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={instagram} onClose={onInstaClick}>
        <div className="w-10 text-center mt-1">
          비공개입니다.
          <div className="text-center">
            <button onClick={onInstaClick}>BACK</button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={sendEmail} onClose={onSendEmail}>
        <DynamicEmailSender onClose={onSendEmail} />
      </Modal>
    </>
  );
};
