"use client";

import { useInterObs } from "@/hooks/useInterObs";
import styles from "./index.module.css";

export const ShowBox = () => {
  const { ref, inView } = useInterObs<HTMLDivElement>({ threshold: 0.75 });
  const { ref: ref2, inView: iv2 } = useInterObs<HTMLDivElement>({
    threshold: 0.5,
  });
  const { ref: ref3, inView: iv3 } = useInterObs<HTMLDivElement>();

  return (
    <div className={styles.showbox}>
      <div
        className={`${styles.box} ${styles.left} ${
          inView ? styles.active : ""
        }`}
        ref={ref}
      >
        Language
        <p>JavaScript</p>
        <p>TypeScript</p>
        <p>CSS</p>
      </div>
      <div
        className={`${styles.box} ${styles.left} ${iv2 ? styles.active : ""}`}
        ref={ref2}
      >
        FrameWork/Library
        <p>React</p>
        <p>Next.js</p>
        <p>SvelteKit</p>
        <p>Storybook</p>
        <p>Express</p>
        <p>tanstack query</p>
      </div>
      <div className={`${styles.box} ${iv3 ? styles.active : ""}`} ref={ref3}>
        Dev. environment
        <p>Visual Studio Code</p>
        <p>Eslint</p>
        <p>Prettier</p>
        <p>npm</p>
        <p>Yarn</p>
        <p>Vite</p>
      </div>
    </div>
  );
};
