import { ClientComponent } from "./clientComponent";
import styles from "./index.module.css";

export const metadata = {
  title: "프로젝트 내역",
};

export default function Page() {
  return (
    <div className="d-flex flex-column justify-cc mt-3">
      <div className={styles["proj-list"]}>
        <ClientComponent />
      </div>
    </div>
  );
}
