import type { StaticImageData } from "next/image";
import { TechStackEnum } from "./tech-stack";

import POCAZThumbnail from "@/../public/thumbnail/project/pocaz.png";
import ChooseMenuThumbnail from "@/../public/thumbnail/project/choose-menu.png";
import AlltimeCarThumbnail from "@/../public/thumbnail/project/alltime-car.png";
import FrontendJuniorStudyThumbnail from "@/../public/thumbnail/project/frontend-junior-study.png";
import ReactDevtoolCliThumbnail from "@/../public/thumbnail/project/react-devtool-cli.png";

export type ProjectDetail = {
  /** URL 경로용 */
  slug: string;
  /** 프로젝트 제목 */
  title: string;
  /** 프로젝트 썸네일 */
  thumbnail: string | StaticImageData;
  /** 프로젝트 한 줄 요약 */
  summary: string;
  /** 프로젝트 기간 */
  period: string;
  /** 프로젝트 팀 규모 */
  team: string;
  /** 프로젝트 역할 */
  role: string;

  /** 프로젝트 링크 */
  links: {
    /** 프로젝트 GitHub 링크 */
    github?: string;
    /** 프로젝트 Demo 링크 */
    demo?: string;
    /** 프로젝트 기타 링크 */
    etc?: { label: string; url: string }[];
  };

  /** 프로젝트 메인 콘텐츠 */
  overview: {
    /** 프로젝트 배경 */
    background: string;
    /** 프로젝트 목표 */
    goal: string;
    /** 프로젝트 주요 기능 목록 */
    features: string[];
  };

  /** 기술적 내용 */
  tech: {
    /** 프로젝트 기술 스택 */
    stack: TechStackEnum[];
    /** 프로젝트 챌린지 */
    challenges: { title: string; description: string }[];
    /** 프로젝트 해결책 */
    solutions: { title: string; description: string }[];
  };

  /** 성과 */
  achievements: {
    /** 성과 메트릭 */
    metrics?: { label: string; value: string }[];
    /** 성과 피드백 목록 */
    feedback?: string[];
    /** 성과 개선사항 */
    improvements?: string[];
  };

  /** 프로젝트 갤러리 */
  gallery: {
    src: string | StaticImageData;
    alt: string;
    caption?: string;
  }[];

  /** 프로젝트 메타데이터 */
  metadata: {
    /** 프로젝트 발행일 */
    publishedAt: string;
    /** 프로젝트 업데이트일 */
    updatedAt?: string;
    /** 프로젝트 태그 */
    tags: string[];
  };
};

export const projectDetailList: ProjectDetail[] = [
  {
    slug: "pocaz",
    title: "POCAZ Remake",
    thumbnail: POCAZThumbnail,
    summary:
      "분산된 포토카드 리셀 거래를 검색·찜·채팅 중심 단일 경험으로 재구성한 리메이크 프로젝트",
    period: "2025.12 -",
    team: "1인 프로젝트",
    role: "풀스택 개발 (Next.js, 상태관리, API 연동)",

    links: {
      github: "https://github.com/Ring-wdr/pocaz-remake",
      demo: "https://pocaz-remake.vercel.app/",
    },

    overview: {
      background:
        "포토카드 리셀 수요는 커졌지만 실제 거래는 트위터, 번개장터, 당근마켓처럼 맥락이 분산된 플랫폼에 흩어져 있었습니다. 구매자는 원하는 카드의 상태와 가격을 비교하기 어렵고, 판매자는 거래 진행 상황을 한눈에 관리하기 어려운 문제가 있었습니다.",
      goal: "수집가가 원하는 카드를 더 빨리 찾고, 판매자는 등록부터 대화와 거래 관리까지 하나의 흐름 안에서 처리할 수 있도록 전문 리셀 경험을 재설계하는 것이 목표였습니다.",
      features: [
        "포토카드 등록, 상태 표기, 거래 진행 상태를 한 화면에서 관리하는 판매 흐름",
        "아이돌, 앨범, 멤버 기준으로 좁혀 들어가는 검색 및 필터링",
        "구매자와 판매자가 바로 대화를 시작할 수 있는 실시간 채팅",
        "사용자 프로필, 거래 히스토리, 찜 목록을 묶은 개인화 영역",
        "거래 이탈을 줄이기 위한 알림 및 신고 흐름",
      ],
    },

    tech: {
      stack: [
        "React",
        "Next.js",
        "StyleX",
        "Elysia.js",
        "PostgreSQL",
        "Prisma",
        "Supabase",
        "Bun.js",
      ],
      challenges: [
        {
          title: "대량의 이미지 데이터 최적화",
          description:
            "거래 목록에서 썸네일이 많아질수록 첫 화면 진입이 느려졌고, 수집가가 빠르게 스캔해야 하는 핵심 경험이 무너질 수 있었습니다.",
        },
        {
          title: "실시간 채팅 기능 구현",
          description:
            "사용자에게는 즉시성 있는 대화가 필요했지만, 상태 동기화와 읽음 처리까지 포함한 실시간 흐름을 안정적으로 설계해야 했습니다.",
        },
        {
          title: "복잡한 필터링 로직",
          description:
            "아이돌, 앨범, 멤버, 가격대가 동시에 바뀌는 필터 조합이 늘어나며 상태 동기화가 빠르게 복잡해졌습니다.",
        },
      ],
      solutions: [
        {
          title: "이미지 Lazy Loading 및 최적화",
          description:
            "Intersection Observer를 기반으로 목록 진입 시점에는 필요한 썸네일만 우선 로드하도록 구성해 탐색 시작 속도를 방어했습니다.",
        },
        {
          title: "Socket.io를 활용한 실시간 통신",
          description:
            "실시간 채팅과 읽음 상태를 Socket 기반으로 묶어 거래 문의가 다른 메신저로 새지 않도록 제품 내부에서 끝나는 대화 경험을 설계했습니다.",
        },
        {
          title: "필터 상태를 탐색 시나리오 기준으로 재조합",
          description:
            "복잡한 상태를 단순한 조건 객체로 정리하고 필터 변경 순서를 명확히 해, 검색 조건이 늘어나도 예측 가능한 탐색 흐름을 유지했습니다.",
        },
      ],
    },

    achievements: {
      metrics: [
        { label: "개발 상태", value: "진행 중" },
        { label: "팀 규모", value: "1명" },
        { label: "등록된 카드", value: "100+" },
      ],
      feedback: [
        "원하는 멤버와 앨범 기준으로 바로 좁혀갈 수 있어 탐색이 편했습니다.",
        "채팅이 제품 안에서 이어져 거래 문의 흐름이 끊기지 않았습니다.",
        "검색과 찜 기능이 함께 있어서 비교가 쉬웠습니다.",
      ],
      improvements: [
        "리메이크에서는 전문 거래 제품이 되려면 탐색 속도와 거래 대화의 연결성이 가장 먼저 확보되어야 한다는 점을 배웠습니다.",
        "이미지와 필터 로직은 초기부터 성능 예산을 두고 설계해야 이후 기능 추가가 쉬워진다는 기준을 세웠습니다.",
        "다음 단계에서는 결제/안전거래 같은 신뢰 기능을 붙여 실제 거래 완료 경험까지 확장할 계획입니다.",
      ],
    },

    gallery: [
      {
        src: POCAZThumbnail,
        alt: "POCAZ 메인 페이지",
        caption: "포토카드 거래 플랫폼 메인 화면",
      },
    ],

    metadata: {
      publishedAt: "2023-06-01T00:00:00Z",
      tags: ["React", "E-commerce", "Real-time Chat", "Image Optimization"],
    },
  },
  {
    slug: "daedo-law",
    title: "법률사무소 대도",
    thumbnail:
      "https://postfiles.pstatic.net/MjAyMzA0MThfODQg/MDAxNjgxNzk3MDYyNDc4.2uzOQ-Oiw-XsNK013YGZYSH7pvmBB63HXt-RpL8OFdUg.M3YvSedp13rgsbfXfxK-PVt-dF5TtnMm6ubigz8I-Gog.PNG.gsh113/%EB%8C%80%EB%8F%84_%ED%98%84%ED%8C%90.png?type=w773",
    summary: "법률사무소 공식 웹사이트 및 관리자 시스템",
    period: "2023.03 - 2023.05",
    team: "2인 팀 프로젝트",
    role: "프론트엔드 개발 (SvelteKit, 라우팅, 관리자 페이지)",

    links: {
      demo: "https://www.daedolaw.com/",
    },

    overview: {
      background:
        "법률사무소 대도의 온라인 존재감 강화와 고객 상담 프로세스 개선을 위한 공식 웹사이트 및 관리자 시스템 구축 프로젝트였습니다.",
      goal: "전문적이고 신뢰감 있는 웹사이트를 구축하고, 관리자가 콘텐츠를 쉽게 관리할 수 있는 CMS 시스템을 제공하는 것이 목표였습니다.",
      features: [
        "사무소 소개 및 변호사 프로필 페이지",
        "전문 분야별 법률 서비스 안내",
        "상담 예약 시스템",
        "법률 칼럼 및 소식 게시판",
        "관리자 페이지 (콘텐츠 관리)",
        "반응형 디자인",
      ],
    },

    tech: {
      stack: ["SvelteKit", "Supabase", "Tailwind CSS", "TypeScript"],
      challenges: [
        {
          title: "SvelteKit의 새로운 라우팅 시스템",
          description:
            "SvelteKit의 파일 기반 라우팅과 레이아웃 시스템을 처음 사용하면서 구조를 이해하는데 시간이 걸렸습니다.",
        },
        {
          title: "Supabase 데이터베이스 설계",
          description:
            "변호사 프로필, 법률 서비스, 게시글 등 다양한 콘텐츠를 효율적으로 관리하기 위한 데이터베이스 구조 설계가 필요했습니다.",
        },
        {
          title: "관리자 권한 관리",
          description:
            "Supabase의 Row Level Security(RLS)를 활용하여 관리자만 콘텐츠를 수정할 수 있도록 권한을 설정해야 했습니다.",
        },
      ],
      solutions: [
        {
          title: "SvelteKit 라우팅 구조 학습 및 적용",
          description:
            "공식 문서와 예제를 참고하여 레이아웃 시스템을 이해하고, 공통 레이아웃과 페이지별 레이아웃을 효율적으로 구성했습니다.",
        },
        {
          title: "정규화된 데이터베이스 설계",
          description:
            "변호사, 서비스, 게시글 테이블을 정규화하고, 외래 키를 활용하여 데이터 무결성을 보장했습니다. Supabase의 실시간 기능을 활용하여 관리자가 수정한 내용이 즉시 반영되도록 구현했습니다.",
        },
        {
          title: "Supabase RLS 정책 설정",
          description:
            "관리자 role을 생성하고, RLS 정책을 통해 인증된 관리자만 데이터를 생성/수정/삭제할 수 있도록 보안을 강화했습니다.",
        },
      ],
    },

    achievements: {
      metrics: [
        { label: "개발 기간", value: "2개월" },
        { label: "팀 규모", value: "2명" },
        { label: "페이지 수", value: "15+" },
      ],
      feedback: [
        "깔끔하고 전문적인 디자인이 법률사무소 이미지와 잘 맞습니다.",
        "관리자 페이지를 통해 콘텐츠를 쉽게 업데이트할 수 있어 편리합니다.",
        "모바일에서도 깔끔하게 보여서 좋습니다.",
      ],
      improvements: [
        "관리자 페이지 도입으로 콘텐츠 업데이트 시간 80% 단축",
        "상담 예약 시스템으로 고객 문의 처리 효율성 50% 향상",
      ],
    },

    gallery: [
      {
        src: "https://postfiles.pstatic.net/MjAyMzA0MThfODQg/MDAxNjgxNzk3MDYyNDc4.2uzOQ-Oiw-XsNK013YGZYSH7pvmBB63HXt-RpL8OFdUg.M3YvSedp13rgsbfXfxK-PVt-dF5TtnMm6ubigz8I-Gog.PNG.gsh113/%EB%8C%80%EB%8F%84_%ED%98%84%ED%8C%90.png?type=w773",
        alt: "법률사무소 대도 메인 페이지",
        caption: "법률사무소 공식 웹사이트 메인 화면",
      },
    ],

    metadata: {
      publishedAt: "2023-05-01T00:00:00Z",
      tags: ["SvelteKit", "CMS", "Supabase", "Corporate Website"],
    },
  },
  {
    slug: "choose-menu",
    title: "메뉴 고르기 앱",
    thumbnail: ChooseMenuThumbnail,
    summary:
      "메뉴 선택 시간을 줄이기 위해 크롤링·추천·운영 도구를 하나로 묶은 카페 메뉴 추천 서비스",
    period: "2024.01 - 2024.03",
    team: "개인 프로젝트",
    role: "풀스택 개발 (Next.js, MongoDB, 크롤링)",

    links: {
      demo: "https://choose-menu.vercel.app/",
    },

    overview: {
      background:
        "브랜드별 메뉴가 빠르게 바뀌는 카페 환경에서는 사용자가 메뉴판 앞에서 오래 고민하거나, 자주 마시는 메뉴를 다시 찾는 데 불필요한 시간이 들었습니다.",
      goal: "사용자가 취향에 맞는 메뉴를 빠르게 고를 수 있도록 추천 경험을 만들고, 운영 측면에서는 메뉴 정보를 수집·정리하는 흐름을 자동화하는 것이 목표였습니다.",
      features: [
        "브랜드별 메뉴 정보를 수집해 저장하는 크롤링 파이프라인",
        "사용자 선호 메뉴를 저장하고 다시 불러오는 개인화 기능",
        "선택 이력 기반 메뉴 추천 로직",
        "운영자가 메뉴를 수정·보완할 수 있는 관리자 화면",
        "브랜드/카테고리 기준 검색과 필터링",
      ],
    },

    tech: {
      stack: ["Next.js", "TypeScript", "MongoDB"],
      challenges: [
        {
          title: "카페 메뉴 데이터 크롤링",
          description:
            "브랜드별로 다른 DOM 구조에서 메뉴 정보를 안정적으로 수집해야 했고, 수집 실패가 곧 추천 품질 저하로 이어졌습니다.",
        },
        {
          title: "메뉴 추천 알고리즘",
          description:
            "초기 데이터가 많지 않은 상태에서 사용자가 다시 방문할 이유를 만들 수 있는 추천 기준이 필요했습니다.",
        },
        {
          title: "MongoDB 스키마 설계",
          description:
            "메뉴, 브랜드, 사용자 선호 데이터가 계속 늘어나는 구조에서 읽기 성능과 확장성을 함께 고려해야 했습니다.",
        },
      ],
      solutions: [
        {
          title: "Puppeteer를 활용한 웹 크롤링",
          description:
            "Puppeteer 기반 수집 흐름으로 브랜드별 메뉴 정보를 정리하고, 추천 로직이 사용할 수 있는 형태로 저장했습니다.",
        },
        {
          title: "협업 필터링 기반 추천 시스템",
          description:
            "사용자 선택 이력을 기반으로 유사 취향 패턴을 묶어, 메뉴판을 모두 읽지 않아도 빠르게 다음 선택지를 제안하도록 구성했습니다.",
        },
        {
          title: "유연한 MongoDB 스키마 설계",
          description:
            "브랜드와 메뉴는 분리하고 선호 정보는 사용자 중심으로 묶어, 운영 수정과 추천 조회가 서로 발목 잡지 않도록 데이터 흐름을 분리했습니다.",
        },
      ],
    },

    achievements: {
      metrics: [
        { label: "개발 기간", value: "2개월" },
        { label: "크롤링 메뉴", value: "200+" },
        { label: "지원 카페", value: "5개 브랜드" },
      ],
      improvements: [
        "문제 해결 가치가 분명한 제품이라도 데이터 수집 파이프라인이 먼저 안정화되어야 추천 경험이 설득력을 가진다는 점을 배웠습니다.",
        "운영 화면을 함께 설계해야 추천 시스템이 일회성 데모가 아니라 지속적으로 유지될 수 있다는 기준을 세웠습니다.",
        "다음 단계에서는 사용자 피드백과 재선택률을 함께 측정해 추천 품질을 더 정교하게 보정할 계획입니다.",
      ],
    },

    gallery: [
      {
        src: ChooseMenuThumbnail,
        alt: "메뉴 고르기 앱 메인 페이지",
        caption: "카페 메뉴 추천 서비스 메인 화면",
      },
    ],

    metadata: {
      publishedAt: "2024-03-01T00:00:00Z",
      tags: ["Next.js", "MongoDB", "Web Scraping", "Recommendation System"],
    },
  },
  {
    slug: "alltime-car",
    title: "역대카",
    thumbnail: AlltimeCarThumbnail,
    summary: "렌트카 가격 비교 및 추천 서비스",
    period: "2024.06 - 2024.08",
    team: "개인 프로젝트",
    role: "풀스택 개발 (Next.js, Supabase)",

    links: {
      demo: "https://alltime-car.com/",
    },

    overview: {
      background:
        "렌트카 업체마다 가격 정책이 다르고 비교하기 어려워, 사용자들이 합리적인 선택을 하기 힘든 문제를 해결하고자 시작했습니다.",
      goal: "여러 렌트카 업체의 가격을 한눈에 비교하고, 가장 저렴한 옵션을 추천하는 서비스를 제공하는 것이 목표였습니다.",
      features: [
        "렌트카 업체별 가격 비교",
        "차량 종류별 필터링",
        "날짜 및 지역별 검색",
        "가격 추이 그래프",
        "최저가 알림 기능",
        "사용자 리뷰 및 평점",
      ],
    },

    tech: {
      stack: ["Next.js", "Supabase", "Prisma", "Tailwind CSS", "TypeScript"],
      challenges: [
        {
          title: "실시간 가격 데이터 수집",
          description:
            "여러 렌트카 업체의 실시간 가격 정보를 효율적으로 수집하고 업데이트하는 시스템이 필요했습니다.",
        },
        {
          title: "가격 비교 알고리즘",
          description:
            "차량 등급, 렌트 기간, 보험 옵션 등 다양한 변수를 고려한 가격 비교 로직이 복잡했습니다.",
        },
        {
          title: "대량 데이터 처리 성능",
          description:
            "수천 개의 렌트카 가격 데이터를 빠르게 조회하고 필터링하는 성능이 중요했습니다.",
        },
      ],
      solutions: [
        {
          title: "정규화된 가격 비교 알고리즘",
          description:
            "차량 등급, 보험 옵션 등의 조건을 표준화하여 공정한 비교가 가능하도록 했습니다. 가격뿐만 아니라 추가 서비스, 평점 등을 종합적으로 고려한 점수 시스템을 도입했습니다.",
        },
        {
          title: "Supabase 인덱싱 및 쿼리 최적화",
          description:
            "자주 사용되는 필터 조건(날짜, 지역, 차량 종류)에 대해 복합 인덱스를 생성하여 조회 성능을 개선했습니다. Supabase와 Prisma를 활용하여 복잡한 쿼리를 효율적으로 처리했습니다.",
        },
      ],
    },

    achievements: {
      metrics: [
        { label: "개발 기간", value: "2개월" },
        { label: "지원 업체", value: "10+" },
        { label: "등록 차량", value: "150+" },
      ],
      feedback: [
        "여러 업체의 가격을 한 번에 비교할 수 있어 편리합니다.",
        "가격 추이를 볼 수 있어서 언제 예약하면 좋을지 알 수 있습니다.",
        "인터페이스가 직관적이고 사용하기 쉽습니다.",
      ],
      improvements: [
        "렌트카 비교 시간 90% 단축",
        "평균 렌트 비용 15% 절감",
        "사용자 만족도 4.5/5.0 달성",
      ],
    },

    gallery: [
      {
        src: AlltimeCarThumbnail,
        alt: "역대카 메인 페이지",
        caption: "렌트카 가격 비교 서비스 메인 화면",
      },
    ],

    metadata: {
      publishedAt: "2024-08-01T00:00:00Z",
      tags: ["Next.js", "Price Comparison", "Supabase", "Real-time Data"],
    },
  },
  {
    slug: "frontend-junior-study",
    title: "프론트엔드 주니어 스터디",
    thumbnail: FrontendJuniorStudyThumbnail,
    summary: "15주간의 체계적인 프론트엔드 학습 커리큘럼 레포지토리",
    period: "2025.11 - 2026.01",
    team: "개인 프로젝트",
    role: "커리큘럼 설계 및 학습 자료 정리",

    links: {
      github: "https://github.com/Ring-wdr/frontend-junior-study",
      demo: "https://ring-wdr.github.io/frontend-junior-study/",
    },

    overview: {
      background:
        "프론트엔드 개발자로서 체계적인 학습의 필요성을 느끼고, 개인 학습 커리큘럼을 정리하기 위해 시작한 프로젝트입니다. 단순 이론 학습이 아닌 실습을 병행하며 기록하는 것을 목표로 했습니다.",
      goal: "15주간의 체계적인 프론트엔드 학습 커리큘럼을 구성하고, 각 주차별 핵심 개념 요약, 공부 자료, 블로그 링크를 포함하여 이론과 실습을 병행하는 학습 환경을 구축하는 것이 목표였습니다.",
      features: [
        "1-5주: JavaScript 심화, 디자인 패턴, React/Next.js 심화",
        "6-10주: 스타일링, 폼 관리, 테스팅, 애니메이션",
        "11-15주: 성능 최적화, 보안, PWA, 접근성, 개발 도구",
        "주차별 핵심 개념 요약 및 정리",
        "실습 예제 코드 및 블로그 연동",
      ],
    },

    tech: {
      stack: ["TypeScript", "Bun.js", "CSS"],
      challenges: [
        {
          title: "모던 빌드 도구 학습",
          description:
            "기존 Webpack 대신 Rsbuild를 도입하면서 새로운 빌드 시스템의 설정과 최적화 방법을 학습해야 했습니다.",
        },
        {
          title: "테스트 환경 구축",
          description:
            "RSTest를 활용한 테스트 환경 구축과 테스트 작성 패턴을 학습하며 실습 환경을 구성해야 했습니다.",
        },
        {
          title: "커리큘럼 구조화",
          description:
            "방대한 프론트엔드 학습 범위를 15주라는 기간에 맞게 체계적으로 구조화하는 것이 도전이었습니다.",
        },
      ],
      solutions: [
        {
          title: "Rsbuild 기반 개발 환경 구축",
          description:
            "Rsbuild를 활용하여 빠른 빌드와 개발 서버 환경을 구축했습니다. Bun을 패키지 매니저로 사용하여 의존성 설치 속도를 개선했습니다.",
        },
        {
          title: "Biome 린팅 도입",
          description:
            "ESLint와 Prettier 대신 Biome를 도입하여 린팅과 포매팅을 단일 도구로 통합하고 설정을 간소화했습니다.",
        },
        {
          title: "주차별 모듈화된 구조",
          description:
            "각 주차를 독립적인 모듈로 구성하여 순서대로 학습하거나 필요한 주제만 선택적으로 학습할 수 있도록 구조화했습니다.",
        },
      ],
    },

    achievements: {
      metrics: [
        { label: "학습 기간", value: "15주" },
        { label: "주요 토픽", value: "15개" },
        { label: "기술 스택", value: "6개" },
      ],
      improvements: [
        "모던 빌드 도구(Rsbuild) 실무 활용 능력 향상",
        "테스트 주도 개발(TDD) 패턴 학습",
        "체계적인 학습 기록 습관 형성",
      ],
    },

    gallery: [
      {
        src: FrontendJuniorStudyThumbnail,
        alt: "프론트엔드 주니어 스터디 레포지토리",
        caption: "프론트엔드 학습 커리큘럼 GitHub 레포지토리",
      },
    ],

    metadata: {
      publishedAt: "2024-09-01T00:00:00Z",
      tags: ["TypeScript", "Learning", "Curriculum", "Frontend"],
    },
  },
  {
    slug: "react-devtool-cli",
    title: "react-devtool-cli",
    thumbnail: ReactDevtoolCliThumbnail,
    summary:
      "React inspection과 profiler 분석을 에이전트/개발자가 재현 가능한 결정론적 CLI 계약으로 옮긴 agent-first 디버깅 도구",
    period: "2026.03 -",
    team: "개인 프로젝트",
    role: "CLI 설계 및 구현, Playwright 세션 전송 계층 구성, snapshot-aware React inspection과 profiler 워크플로우 설계, Codex/Claude Code 친화적 실행 표면 정리",

    links: {
      github: "https://github.com/Ring-wdr/react-devtool-cli",
      etc: [
        {
          label: "npm",
          url: "https://www.npmjs.com/package/react-devtool-cli",
        },
        {
          label: "Release",
          url: "https://github.com/Ring-wdr/react-devtool-cli/releases/tag/v0.1.34-public",
        },
      ],
    },

    overview: {
      background:
        "React DevTools UI만으로는 에이전트나 스크립트 기반 자동화 흐름에서 동일한 조사 과정을 재현하기 어렵습니다. React 트리 상태, source 힌트, profiler 신호를 명령형 인터페이스로 노출해 디버깅과 성능 분석을 자동화 가능한 형태로 만들 필요가 있었습니다.",
      goal: "session open/connect/attach부터 snapshot 기반 트리 조회, node inspect, 내장 interact 명령, commit 중심 profiler 분석까지 하나의 CLI 표면으로 제공해 로컬과 에이전트 환경 모두에서 재현 가능한 React 조사 흐름을 만드는 것이 목표였습니다.",
      features: [
        "Playwright Node API 기반 `session open`, Playwright protocol 기반 `session connect`, Chromium CDP 호환 기반 `session attach` 지원",
        "`tree get`이 snapshot id를 반환해 이후 `node search`, `node inspect`, `node highlight`, `source reveal` 흐름을 snapshot 범위 안에서 일관되게 수행",
        "`interact click`, `interact type`, `interact press`, `interact wait`를 같은 브라우저 세션 위에서 직접 실행",
        "`session doctor`로 selected engine, capability 힌트, Playwright 해석 결과, profiler 준비 상태, helper 전략을 사전 점검",
        "summary, commit drill-down, ranked hotspot, flamegraph, compare, export를 포함한 commit 중심 profiler 분석 명령 제공",
        "Codex, Claude Code, Gemini CLI 등에서 바로 사용할 수 있도록 번들 스킬 디렉터리 제공",
      ],
    },

    tech: {
      stack: ["React", "Playwright", "Command Line", "JavaScript"],
      challenges: [
        {
          title: "에이전트가 재사용할 수 있는 결정론적 CLI 응답 설계",
          description:
            "후속 자동화는 안정적인 식별자와 신뢰 경계가 응답에 명확히 드러날 때만 안전하게 동작합니다. snapshot id, observation level, limitations, runtime warnings 같은 구조화된 필드가 필요했습니다.",
        },
        {
          title: "snapshot 범위 안에서 node identity 유지하기",
          description:
            "node id는 그것을 생성한 snapshot 안에서만 의미가 있습니다. search, inspect, highlight, source reveal이 모두 같은 snapshot 문맥을 유지해야 했고, 만료 시에는 명확한 오류로 다시 수집을 유도해야 했습니다.",
        },
        {
          title: "Playwright와 React 런타임 차이를 안전하게 처리하기",
          description:
            "local/global Playwright 해석, custom/devtools 엔진 전환, React 19 이후의 제한적인 source 지원 여부를 함께 다뤄야 했고, 사용자가 분석 신뢰도를 오해하지 않도록 안내해야 했습니다.",
        },
      ],
      solutions: [
        {
          title: "snapshot-aware 명령 표면 설계",
          description:
            "`tree get`이 반환한 snapshot id를 후속 node 명령이 직접 재사용하도록 설계했습니다. 런타임에서 snapshot이 제거되면 `snapshot-expired`를 반환해 안전하지 않은 추측 대신 새 트리를 다시 수집하도록 유도했습니다.",
        },
        {
          title: "`session doctor` 기반 capability discovery",
          description:
            "engine preference, selected engine, recommended engine, source capability, helper import strategy를 한 번에 노출해 현재 환경에서 interact, source reveal, profiler 명령을 어디까지 신뢰할 수 있는지 판단할 수 있게 했습니다.",
        },
        {
          title: "transport, interaction, profiling을 하나의 표면으로 통합",
          description:
            "세션 transport 명령, 내장 interaction helper, commit 중심 profiler 분석을 하나의 CLI 표면에 묶어 source reveal부터 성능 triage까지 별도 도구 전환 없이 이어질 수 있도록 했습니다.",
        },
      ],
    },

    achievements: {
      metrics: [
        { label: "npm 버전", value: "0.1.34" },
        { label: "GitHub tag", value: "v0.1.34-public" },
        { label: "저장소 이력", value: "35 commits" },
      ],
      improvements: [
        "디버깅 도구도 에이전트 친화적인 계약과 실패 모드를 먼저 설계해야 후속 자동화가 안전하다는 점을 배웠습니다.",
        "snapshot id 같은 컨텍스트 정보를 명시적으로 노출해야 분석 재현성과 사용자 신뢰를 동시에 얻을 수 있다는 기준을 세웠습니다.",
        "동일한 도구라도 Codex와 Claude Code처럼 실행 표면이 다른 에이전트에 맞춰 brief, capability 설명, 검증 절차를 함께 제공해야 실제 팀 생산성이 올라간다는 점을 확인했습니다.",
        "다음 단계에서는 더 많은 프레임워크/런타임 환경에서 capability 차이를 자동 감지해 설정 부담을 줄일 계획입니다.",
      ],
    },

    gallery: [
      {
        src: ReactDevtoolCliThumbnail,
        alt: "react-devtool-cli 썸네일",
        caption:
          "react-devtool-cli의 터미널 중심 워크플로우를 요약한 커버 이미지",
      },
    ],

    metadata: {
      publishedAt: "2026-03-18T23:32:21Z",
      tags: [
        "React",
        "Playwright",
        "CLI",
        "Profiler",
        "Agent Tooling",
        "Codex",
        "Claude Code",
      ],
    },
  },
];
