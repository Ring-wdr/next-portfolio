import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function ProjectItem({
  src,
  title,
  href,
  techStack,
  description,
}: {
  src: string;
  title: string;
  href: string;
  techStack: string[];
  description?: ReactNode;
}) {
  return (
    <div className="p-4 @container">
      <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
        <Link
          href={href}
          className="relative w-full aspect-video rounded-lg overflow-hidden group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
          <p className="text-lg font-bold leading-tight tracking-[-0.015em]">
            {title}
          </p>
          <div className="flex items-end gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[#9cabba] text-base font-normal leading-normal">
                {techStack.join(", ")}
              </p>
              <div className="text-[#9cabba] text-base font-normal leading-normal">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
