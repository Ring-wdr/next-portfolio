import Image from "next/image";
import Link from "next/link";

import { projectList } from "@/shared/constant/project";
import { TechStack } from "@/shared/constant/tech-stack";
import { MainProjectItem } from "./project/item";

export function MainPage() {
  return (
    <div className="md:px-8 lg:px-16 xl:px-24 flex flex-1 justify-center">
      <div className="flex flex-col w-full max-w-full md:max-w-4xl flex-1">
        <div className="w-full">
          <div className="p-0 md:p-4">
            <div className="relative flex min-h-[350px] md:min-h-[480px] flex-col gap-6 md:gap-8 md:rounded-lg items-start justify-end px-10 pb-10 overflow-hidden w-full py-10">
              <Image
                src="https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g"
                alt="Manjoong profile background"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 960px"
                quality={90}
                className="object-cover object-center z-0"
              />
              <div
                className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 to-background/40"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2 text-left relative z-20">
                <h1 className="flex items-center text-4xl font-black mb-4 no-underline bg-gradient-to-r from-primary from-50% via-[#ff5858] via-50% to-[#cc2e5d] bg-[length:200%_100%] bg-clip-text text-transparent transition-all duration-300 ease-out break-keep hover:bg-[position:100%_0]">
                  Hi, I&apos;m Manjoong, a Front-End Developer
                </h1>
                <h2 className="text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  I build beautiful and functional web experiences using modern
                  technologies. Explore my portfolio to see my work and learn
                  more about my skills.
                </h2>
              </div>
              <Link
                href="/project"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0c7ff2] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] relative z-20 text-white"
              >
                <span className="truncate">View Projects</span>
              </Link>
            </div>
          </div>
        </div>
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Featured Projects
        </h2>
        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-3">
            {projectList
              .toReversed()
              .slice(0, 3)
              .map((project) => (
                <MainProjectItem
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  src={project.src}
                  href={project.href}
                />
              ))}
          </div>
        </div>
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Tech Stack
        </h2>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          {TechStack.map((tech) => (
            <button
              key={tech.name}
              className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4 hover:bg-primary hover:text-background"
            >
              <p className="text-sm font-medium leading-normal">{tech.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
