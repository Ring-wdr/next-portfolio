import * as stylex from "@stylexjs/stylex";
import { projectList } from "./projectList";
import { ProjectItem } from "./ProjectItem";

export const metadata = {
  title: "프로젝트 내역",
};

const projectStyle = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 3 * 16,
  },
  base: {
    display: "grid",
    gap: 4 * 16,
    gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
  },
});

export default function Page() {
  return (
    <div {...stylex.props(projectStyle.wrapper)}>
      <div {...stylex.props(projectStyle.base)}>
        {projectList.map(({ src, title, href, description }) => (
          <ProjectItem
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
