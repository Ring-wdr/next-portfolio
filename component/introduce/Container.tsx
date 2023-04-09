import { Button } from "../common/Button";
import styles from "./container.module.css";

export const Container = () => (
  <div>
    <div className={styles.welcome}>
      Hi,
      <br /> Welcome to PORTFOLIO
      <br /> of Ring-Wdr
    </div>
    <p className={styles["short-desc"]}>and I&apos;m FrondEnd Developer</p>
    <div className="w-15 mt-2 mb-3">
      <Button className="c-100">Contact me!</Button>
    </div>
  </div>
);
