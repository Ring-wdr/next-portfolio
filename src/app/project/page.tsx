import { ProjectItem } from "./ProjectItem";
import { projectList } from "./projectList";
import styles from "./index.module.css";

export default function Page() {
  return (
    <div className="d-flex flex-column justify-cc mt-3">
      <div className={styles["proj-list"]}>
        {projectList.map(({ src, title, description }) => (
          <ProjectItem
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
