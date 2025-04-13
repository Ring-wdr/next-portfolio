// import styles from "./index.module.css";
import * as stylex from "@stylexjs/stylex";

const footerStyle = stylex.create({
  footer: {
    marginTop: 5 * 16,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 12 * 16,
    background: "#e4f0f0",
  },
  content: {
    width: "80vw",
    maxWidth: 60 * 16,
    margin: 2 * 16,
  },
});

export const Footer = () => {
  return (
    <footer {...stylex.props(footerStyle.footer)}>
      <div {...stylex.props(footerStyle.content)}>
        2023 Ring-Wdr All rights reserved
      </div>
    </footer>
  );
};
