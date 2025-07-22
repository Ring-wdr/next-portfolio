import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { TechStackEnum } from "./tech-stack";

import ChooseMenuThumbnail from "@/../public/thumbnail/project/choose-menu.png";

export type ProjectProps = {
  src: string | StaticImageData;
  title: string;
  href: string;
  description?: ReactNode;
  techStack: TechStackEnum[];
};

export const projectList: ProjectProps[] = [
  {
    src: "https://camo.githubusercontent.com/3414dc60e6294021c229f1cbb8d3c6933ea805681610f933b055dafe3cb61854/68747470733a2f2f696d67312e6461756d63646e2e6e65742f7468756d622f523132383078302f3f73636f64653d6d746973746f72793226666e616d653d68747470732533412532462532466b2e6b616b616f63646e2e6e6574253246646e2532467745336c4325324662747252704453565259592532465270776e46316a6e59504f6834335552306f55594a4b253246696d672e706e67",
    title: "POCAZ",
    href: "https://github.com/TEAM-POCAZ/PocaZ",
    description: (
      <>
        국내 외 아이돌 굿즈 시장이 8000억 규모 이상으로 확대되고 있는 걸 알고
        계신가요? 특히, 아이돌 굿즈의 주식 시장이라고 불리는 아이돌 포토카드
        리셀 거래에 관심이 높아지고 있습니다. 아이돌 포토카드 수집이 하나의
        문화로 자리잡았고 현재 포토카드 리셀 거래가 트위터, 번개장터, 당근마켓
        등에서 거래가 활발히 이루어지고 있는 추세입니다. 전문화되지 않은
        장터들에서의 거래에 따른 사용자 불편을 확인하여, 아이돌 포토카드를
        전문으로 다루는 거래 공간을 만들게 되었습니다.
      </>
    ),
    techStack: ["React", "JavaScript", "Tailwind CSS", "Express.js", "MySQL"],
  },
  {
    src: "https://postfiles.pstatic.net/MjAyMzA0MThfODQg/MDAxNjgxNzk3MDYyNDc4.2uzOQ-Oiw-XsNK013YGZYSH7pvmBB63HXt-RpL8OFdUg.M3YvSedp13rgsbfXfxK-PVt-dF5TtnMm6ubigz8I-Gog.PNG.gsh113/%EB%8C%80%EB%8F%84_%ED%98%84%ED%8C%90.png?type=w773",
    title: "법률사무소 대도",
    href: "https://www.daedolaw.com/",
    description: (
      <>
        sveltekit + supabase로 진행한 법률사무소 대도 홈페이지입니다. 내부
        라우터 설정, 프로젝트 내부에서 사용되는 공통 컴포넌트 작업, 소개 페이지
        마크업, 데이터베이스 테이블 설계 및 관리자 페이지 마크업 및 프론트
        작업을 진행하였습니다.
      </>
    ),
    techStack: ["SvelteKit", "Supabase", "Tailwind CSS", "TypeScript"],
  },
  {
    src: ChooseMenuThumbnail,
    title: "메뉴 고르기 앱",
    href: "https://choose-menu.vercel.app/",
    description: (
      <>
        카페 메뉴 크롤링, 사용자별 메뉴 선택 및 관리자 기능 등을 제공하는 메뉴
        선택 애플리케이션입니다. Next.js와 MongoDB를 사용하여 프로토타입을
        개발했으며, 점차적으로 기능을 고도화할 계획입니다.
      </>
    ),
    techStack: ["Next.js", "TypeScript", "MongoDB"],
  },
];
