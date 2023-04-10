import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

export const Button = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={[styles["custom-button"], className].join(" ")}
    {...props}
  />
);
