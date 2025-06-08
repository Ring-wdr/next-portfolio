import Image from "next/image";
import Link from "next/link";

import LogoImage from "../../../public/ms-icon-150x150.png";
import { Text } from "./text";
import { LinkedinIcon } from "./icon/linkedin";
import { GithubIcon } from "./icon/github";

export function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-border px-10 py-3">
      <Link href="/" className="flex items-center gap-2">
        <Image src={LogoImage} alt="logo" width={24} height={24} />
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          Portfolio
        </h2>
      </Link>
      <div className="flex-1 flex justify-end gap-8">
        <div className="items-center gap-9 hidden md:flex">
          <Text asChild>
            <Link
              href="/project"
              className="text-sm font-medium leading-normal"
            >
              Projects
            </Link>
          </Text>
          <Text asChild>
            <Link
              href="/tech-stack"
              className="text-sm font-medium leading-normal"
            >
              Tech Stack
            </Link>
          </Text>
          <Text asChild>
            <Link href="/about" className="text-sm font-medium leading-normal">
              About Me
            </Link>
          </Text>
          <Text asChild>
            <Link
              href="/contact"
              className="text-sm font-medium leading-normal"
            >
              Contact
            </Link>
          </Text>
        </div>
        <div className="flex gap-2">
          <Link
            href="https://github.com/Ring-wdr"
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10  gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <GithubIcon width={20} height={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/dust-shooter-408560340/"
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
          >
            <LinkedinIcon width={20} height={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
