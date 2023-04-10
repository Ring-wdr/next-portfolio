import { ReactNode } from "react";
import styles from "./desc.module.css";

export const DescWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={styles.desc}>{children}</div>;
};
