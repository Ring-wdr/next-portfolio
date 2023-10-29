import styles from "./index.module.css";

export const LoadingImage = () => (
  <div className={styles["spinner-container"]}>
    <div className={styles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
