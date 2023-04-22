"use client";

import dynamic from "next/dynamic";
import { projectList } from "./projectList";

const DynamicItem = dynamic(
  () => import("./ProjectItem").then(({ ProjectItem }) => ProjectItem),
  { ssr: false }
);

export const ClientComponent = () => {
  return (
    <>
      {projectList.map(({ src, title, href, description }) => (
        <DynamicItem
          key={title}
          src={src}
          href={href}
          title={title}
          description={description}
        />
      ))}
    </>
  );
};
