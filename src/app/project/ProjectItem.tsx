"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import { BottomSheet } from "@/component/BottomSheet";
import styles from "./index.module.css";

export interface ProjectProps {
  src: string;
  title: string;
  description?: ReactNode;
}

export const ProjectItem = ({ src, title, description }: ProjectProps) => {
  const [isOpen, setOpen] = useState(false);
  const toggleBottomSheet = () => setOpen((prev) => !prev);
  const closeBottomSheet = () => setOpen(false);

  return (
    <>
      <div className={styles.item}>
        <button onClick={toggleBottomSheet}>
          <Image src={src} alt={title} fill />
        </button>
        <div className="d-flex justify-cc mt-3">{title}</div>
        <BottomSheet
          isOpen={isOpen}
          setOpen={closeBottomSheet}
          closePosition="25%"
        >
          <div className={`d-flex justify-cc ${styles["height-300"]}`}>
            <div className={styles["img-container"]}>
              <Image
                src={src}
                alt={title}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          {description}
        </BottomSheet>
      </div>
    </>
  );
};
