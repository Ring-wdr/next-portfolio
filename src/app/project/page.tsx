import { projectList } from "./projectList";
import styles from "./index.module.css";
import dynamic from "next/dynamic";

const DynamicItem = dynamic(
  () => import("./ProjectItem").then(({ ProjectItem }) => ProjectItem),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="d-flex flex-column justify-cc mt-3">
      <div className={styles["proj-list"]}>
        {projectList.map(({ src, title, description }) => (
          <DynamicItem
            key={title}
            src={src}
            title={title}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
