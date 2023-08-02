"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./index.module.css";

export interface ProjectProps {
  src: string;
  title: string;
  href: string;
  description?: ReactNode;
}

const DynamicBottomSheet = dynamic(
  () =>
    import("@/component/BottomSheet").then(({ BottomSheet }) => BottomSheet),
  {
    ssr: false,
  }
);

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
    <div className={styles.item}>
      <button onClick={toggleBottomSheet}>
        <Image src={src} alt={title} fill />
      </button>
      <div className="d-flex justify-cc mt-3">{title}</div>
      {isOpen ? (
        <DynamicBottomSheet
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
        </DynamicBottomSheet>
      ) : null}
    </div>
  );
};
