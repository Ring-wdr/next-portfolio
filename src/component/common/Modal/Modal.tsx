"use client";

import { DialogHTMLAttributes, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ isOpen, onClose, children, ...props }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    isOpen ? ref.current?.showModal() : ref.current?.close();
  }, [isOpen]);
  return isOpen
    ? createPortal(
        <dialog className={styles.modal} ref={ref} {...props}>
          <div className={styles.close}>
            <button
              className={[styles.empty, ""].join(" ")}
              onClick={onClose}
            />
          </div>
          <div className={styles.modal_in}>{children}</div>
        </dialog>,
        document.getElementById("modal") as Element
      )
    : null;
};
