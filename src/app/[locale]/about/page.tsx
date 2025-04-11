import Link from "next/link";
import { DescWrapper } from "@/component/common";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("about");
  return (
    <div className="d-flex flex-column justify-cc mt-3">
      <h3 className="mb-2 text-center font-20">{t("reason.title")}</h3>
      <DescWrapper>
        {t.rich("reason.desc", {
          a: splitLinkChucks,
          strong: (chunks) => <strong>{chunks}</strong>,
          p: (chunks) => <p>{chunks}</p>,
        })}
      </DescWrapper>
      <h3 className="mt-5 mb-2 text-center font-20">
        <Link
          className="tc-green"
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
        <Link href={"https://react.dev/"} style={{ color: "cyan" }}>
          <i className="ri-reactjs-fill"></i>React 18
        </Link>
      );
    case "TypeScript":
      return (
        <Link href={"https://www.typescriptlang.org/"} className="tc-blue">
          TypeScript
        </Link>
      );
    case "next":
      return (
        <Link href="https://nextjs.org/" style={{ color: "black" }}>
          Next.js
        </Link>
      );
    case "sveltekit":
      return (
        <Link href="https://kit.svelte.dev/" style={{ color: "crimson" }}>
          Sveltekit
        </Link>
      );
  }
}
