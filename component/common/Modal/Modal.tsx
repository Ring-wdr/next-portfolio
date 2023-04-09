import { DetailedHTMLProps, DialogHTMLAttributes, forwardRef } from "react";
import styles from "./modal.module.css";

export const Modal = forwardRef<
  HTMLDialogElement,
  DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>
>(function Modal({ children, ...props }, ref) {
  return (
    <dialog className={styles.modal} ref={ref} {...props}>
      <form method="dialog" className={styles.close}>
        <button className={[styles.empty, "mb-1"].join(" ")}>X</button>
      </form>
      <div className={styles.modal_in}>{children}</div>
    </dialog>
  );
});
