import Link from "next/link";
import Image from "next/image";
import type { ProjectProps } from "@/shared/constant/project";

type MainProjectItemProps = Pick<
  ProjectProps,
  "title" | "description" | "src" | "href"
>;

export function MainProjectItem({
  title,
  description,
  src,
  href,
}: MainProjectItemProps) {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
      <Link
        href={href}
        className="w-full aspect-video rounded-lg relative overflow-hidden"
      >
        <Image src={src} alt={title} fill className="object-cover" />
      </Link>
      <div>
        <p className="text-base font-medium leading-normal">{title}</p>
        <p className="text-[#9cabba] text-sm font-normal leading-normal line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
}
