import { ReactNode } from "react";
import styles from "./index.module.css";

export const Header = ({ children }: { children: ReactNode }) => {
  return <div className={styles.header}>{children}</div>;
};
