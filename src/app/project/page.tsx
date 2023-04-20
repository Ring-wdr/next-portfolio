import { projectList } from "./projectList";
import styles from "./index.module.css";
import dynamic from "next/dynamic";

const DynamicItem = dynamic(
  () => import("./ProjectItem").then(({ ProjectItem }) => ProjectItem),
  { ssr: false }
);

export const metadata = {
  title: "프로젝트 내역",
  images: [
    {
      url: "https://camo.githubusercontent.com/3414dc60e6294021c229f1cbb8d3c6933ea805681610f933b055dafe3cb61854/68747470733a2f2f696d67312e6461756d63646e2e6e65742f7468756d622f523132383078302f3f73636f64653d6d746973746f72793226666e616d653d68747470732533412532462532466b2e6b616b616f63646e2e6e6574253246646e2532467745336c4325324662747252704453565259592532465270776e46316a6e59504f6834335552306f55594a4b253246696d672e706e67",
      width: 640,
      height: 339,
    },
  ],
};

export default function Page() {
  return (
    <div className="d-flex flex-column justify-cc mt-3">
      <div className={styles["proj-list"]}>
        {projectList.map(({ src, title, href, description }) => (
          <DynamicItem
            key={title}
            src={src}
            href={href}
            title={title}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
