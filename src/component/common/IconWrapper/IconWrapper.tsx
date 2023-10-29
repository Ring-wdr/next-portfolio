import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./icon.module.css";

export const IconWrapper = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={[styles["custom-icon"], className].join(" ")} {...props}>
    {children}
  </button>
);
