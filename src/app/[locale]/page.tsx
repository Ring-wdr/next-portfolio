import Image from "next/image";
import { Container, Header, ShowBox } from "@/component/introduce";

import * as stylex from "@stylexjs/stylex";

const updown = stylex.keyframes({
  "0%": {
    transform: `translateY(-20px)`,
  },
  "50%": {
    transform: `translateY(20px)`,
  },
  "100%": {
    transform: `translateY(-20px)`,
  },
});

const layoutStyle = stylex.create({
  first: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5rem",
    flexDirection: {
      "@media (max-width: 920px)": "column",
    },
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  logoImg: {
    borderRadius: "50%",
    animation: `${updown} 3s linear infinite`,
    transition: "all 0.2s linear",
    scale: {
      ":hover": 1.2,
    },
    boxShadow: {
      ":hover": "0 0 10px 5px #00a0a0",
    },
  },
});

export default function Page() {
  return (
    <>
      <div {...stylex.props(layoutStyle.first)}>
        <Container />
        <div {...stylex.props(layoutStyle.logoContainer)}>
          <Image
            src={"https://avatars.githubusercontent.com/u/70439662?v=4"}
            alt="profile"
            width={300}
            height={300}
            {...stylex.props(layoutStyle.logoImg)}
            priority
          />
        </div>
      </div>
      <Header>
        <div>With Including Skill</div>
        <p>Currently or previously used skill</p>
      </Header>
      <ShowBox />
    </>
  );
}
