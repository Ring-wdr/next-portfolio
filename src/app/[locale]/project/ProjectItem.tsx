"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import { BottomSheet } from "@/component/BottomSheet";
import styles from "./index.module.css";
import Link from "next/link";

export interface ProjectProps {
  src: string;
  title: string;
  href: string;
  description?: ReactNode;
}

export const ProjectItem = ({
  src,
  title,
  href,
  description,
}: ProjectProps) => {
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
          onClose={closeBottomSheet}
          closePosition="25%"
        >
          <div className={`d-flex justify-cc ${styles["height-300"]}`}>
            <div className={styles["img-container"]}>
              <Link href={href} target="_blank" referrerPolicy="no-referrer">
                <Image
                  src={src}
                  alt={title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </div>
          </div>
          {description}
        </BottomSheet>
      </div>
    </>
  );
};
