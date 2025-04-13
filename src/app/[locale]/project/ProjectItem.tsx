"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import * as stylex from "@stylexjs/stylex";

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

const projectStyle = stylex.create({
  item: {
    display: "flex",
    // width: "fit-content",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    paddingTop: 2 * 16,
    paddingBottom: 2 * 16,
  },
  button: {
    position: "relative",
    background: "none",
    border: "none",
    width: 300,
    height: 200,
    overflow: "hidden",
    borderRadius: 15,
    boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
  },
  img: {
    borderRadius: 15,
    objectFit: "contain",
    transition: "0.5s ease",
    userSelect: "none",
    scale: {
      ":hover": 1.2,
    },
  },
  imgContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    margin: "auto",
  },
  height300: {
    height: 300,
  },
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 2 * 16,
  },
});

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
    <div {...stylex.props(projectStyle.item)}>
      <button
        {...stylex.props(projectStyle.button)}
        onClick={toggleBottomSheet}
      >
        <Image src={src} alt={title} fill />
      </button>
      <div {...stylex.props(projectStyle.title)}>{title}</div>
      {isOpen ? (
        <DynamicBottomSheet
          isOpen={isOpen}
          onClose={closeBottomSheet}
          closePosition="50%"
        >
          <div
            {...stylex.props(projectStyle.imgContainer, projectStyle.height300)}
          >
            <Link href={href} target="_blank" referrerPolicy="no-referrer">
              <Image
                src={src}
                alt={title}
                fill
                {...stylex.props(projectStyle.img)}
              />
            </Link>
          </div>
          {description}
        </DynamicBottomSheet>
      ) : null}
    </div>
  );
};
