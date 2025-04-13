import * as stylex from "@stylexjs/stylex";

const r = stylex.keyframes({
  "0%": {
    transform: "rotate(-90deg)",
  },
  "35%": {
    transform: "rotate(270deg)",
  },
  "70%": {
    transform: "rotate(630deg)",
  },
  "100%": {
    transform: "rotate(630deg)",
  },
});

const o = stylex.keyframes({
  "0%": {
    opacity: 1,
  },
  "70%": {
    opacity: 0,
  },
});

const loadingStyle = stylex.create({
  container: {
    margin: 0,
    width: 300,
    height: 300,
    paddingTop: 2 * 16,
    paddingBottom: 2 * 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#a0a8a8",
  },
  spinner: {
    position: "relative",
    width: 60,
    height: 60,
  },
  item: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    animationName: [r, o],
    animationDuration: ["5s", "5s"],
    animationIterationCount: ["infinite", "infinite"],
    animationTimingFunction: [
      "cubic-bezier(0.15, 0.55, 0.85, 0.45)",
      "step-end",
    ],
  },
});

export const LoadingImage = () => (
  <div {...stylex.props(loadingStyle.container)}>
    <div {...stylex.props(loadingStyle.spinner)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
