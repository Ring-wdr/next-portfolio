import Image from "next/image";
import { useTranslations } from "next-intl";

import LogoImage from "../../../public/ms-icon-150x150.png";
import { LinkedinIcon, GithubIcon } from "./icon/brand";
import { Link } from "@/i18n/routing";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-border px-10 py-3">
      <Link href="/" className="flex items-center gap-2">
        <Image src={LogoImage} alt="logo" width={24} height={24} />
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          {t("portfolio")}
        </h2>
      </Link>
      <div className="flex-1 flex justify-end gap-8">
        <div className="items-center gap-9 hidden md:flex">
          <Link
            href="/project"
            className="text-sm font-medium leading-normal hover:text-primary"
          >
            {t("projects")}
          </Link>
          <Link
            href="/tech-stack"
            className="text-sm font-medium leading-normal hover:text-primary"
          >
            {t("techStack")}
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium leading-normal hover:text-primary"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium leading-normal hover:text-primary"
          >
            {t("contact")}
          </Link>
        </div>
        <div className="flex gap-2">
          <LanguageToggle />
          <Link
            href="https://github.com/Ring-wdr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10  gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <GithubIcon width={20} height={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/dust-shooter-408560340/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <LinkedinIcon width={20} height={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
