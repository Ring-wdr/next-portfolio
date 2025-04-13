import Link from "next/link";
import { DescWrapper } from "@/component/common";
import { useTranslations } from "next-intl";
import * as stylex from "@stylexjs/stylex";

const aboutStyle = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 3 * 16,
    gap: 2 * 16,
  },
  title: {
    marginBottom: 2 * 16,
    textAlign: "center",
    fontSize: 32,
  },
  mt20: {
    marginTop: 2 * 16,
  },
  colorGreen: {
    color: "green",
  },
  colorCyan: {
    color: "cyan",
  },
  colorBlue: {
    color: "blue",
  },
  colorBlack: {
    color: "black",
  },
  colorCrimson: {
    color: "crimson",
  },
});

export default function Page() {
  const t = useTranslations("about");
  return (
    <div {...stylex.props(aboutStyle.wrapper)}>
      <h3 {...stylex.props(aboutStyle.title)}>{t("reason.title")}</h3>
      <DescWrapper>
        {t.rich("reason.desc", {
          a: splitLinkChucks,
          strong: (chunks) => <strong>{chunks}</strong>,
          p: (chunks) => <p>{chunks}</p>,
        })}
      </DescWrapper>
      <h3 {...stylex.props(aboutStyle.title, aboutStyle.mt20)}>
        <Link
          {...stylex.props(aboutStyle.colorGreen)}
          href="https://blog.naver.com/enne123"
          target="_blank"
          rel="noopener noreferrer"
        >
          🧾Recording... ⌨️
        </Link>
      </h3>
      <DescWrapper>
        {t.rich("record", {
          p: (chunks) => <p>{chunks}</p>,
        })}
      </DescWrapper>
    </div>
  );
}

function splitLinkChucks(chunks: React.ReactNode) {
  switch (chunks?.toString()) {
    case "JavaScript":
      return (
        <Link
          href="https://developer.mozilla.org/ko/docs/Web/JavaScript"
          className="tc-yellow"
        >
          {chunks}
        </Link>
      );
    case "react":
      return (
        <Link
          href={"https://react.dev/"}
          {...stylex.props(aboutStyle.colorCyan)}
        >
          <i className="ri-reactjs-fill"></i>React 18
        </Link>
      );
    case "TypeScript":
      return (
        <Link
          href={"https://www.typescriptlang.org/"}
          {...stylex.props(aboutStyle.colorBlue)}
        >
          TypeScript
        </Link>
      );
    case "next":
      return (
        <Link
          href="https://nextjs.org/"
          {...stylex.props(aboutStyle.colorBlack)}
        >
          Next.js
        </Link>
      );
    case "sveltekit":
      return (
        <Link
          href="https://kit.svelte.dev/"
          {...stylex.props(aboutStyle.colorCrimson)}
        >
          Sveltekit
        </Link>
      );
  }
}
