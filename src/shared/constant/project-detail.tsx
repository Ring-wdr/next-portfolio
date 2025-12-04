import type { StaticImageData } from "next/image";
import { TechStackEnum } from "./tech-stack";

import POCAZThumbnail from "@/../public/thumbnail/project/pocaz.png";
import ChooseMenuThumbnail from "@/../public/thumbnail/project/choose-menu.png";
import AlltimeCarThumbnail from "@/../public/thumbnail/project/alltime-car.png";

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
    title: "POCAZ-Remake(진행중)",
    thumbnail: POCAZThumbnail,
    summary: "아이돌 포토카드 전문 리셀 거래 플랫폼(Remake)",
    period: "2025.12 -",
    team: "1인 프로젝트",
    role: "풀스택 개발 (Next.js, 상태관리, API 연동)",

    links: {
      github: "https://github.com/Ring-wdr/pocaz-remake",
      demo: "https://pocaz-remake.vercel.app/",
    },

    overview: {
      background:
        "국내외 아이돌 굿즈 시장이 8000억 규모 이상으로 확대되면서, 아이돌 포토카드 리셀 거래에 대한 관심이 높아지고 있습니다. 하지만 트위터, 번개장터, 당근마켓 등 전문화되지 않은 플랫폼에서 거래가 이루어지면서 사용자들이 불편을 겪고 있었습니다.",
      goal: "아이돌 포토카드 수집가들을 위한 전문 거래 플랫폼을 구축하여, 안전하고 편리한 거래 환경을 제공하는 것이 목표였습니다.",
      features: [
        "포토카드 등록 및 거래 시스템",
        "카테고리별 검색 및 필터링 (아이돌, 앨범, 멤버별)",
        "실시간 채팅 기능",
        "사용자 프로필 및 거래 히스토리 관리",
        "찜하기 및 알림 기능",
        "안전 거래를 위한 신고 시스템",
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
            "포토카드 이미지가 많아질수록 페이지 로딩 속도가 느려지는 문제가 발생했습니다. 특히 목록 페이지에서 수십 개의 이미지를 동시에 로드할 때 성능 저하가 심각했습니다.",
        },
        {
          title: "실시간 채팅 기능 구현",
          description:
            "판매자와 구매자 간의 실시간 소통을 위한 채팅 기능이 필요했지만, WebSocket 경험이 부족하여 구현에 어려움을 겪었습니다.",
        },
        {
          title: "복잡한 필터링 로직",
          description:
            "아이돌, 앨범, 멤버, 가격대 등 다양한 조건을 조합한 필터링 기능을 구현하면서 상태 관리가 복잡해졌습니다.",
        },
      ],
      solutions: [
        {
          title: "이미지 Lazy Loading 및 최적화",
          description:
            "Intersection Observer API를 활용한 lazy loading을 구현하였습니다.",
        },
        {
          title: "Socket.io를 활용한 실시간 통신",
          description:
            "Socket.io 라이브러리를 도입하여 실시간 채팅 기능을 구현했습니다. 채팅방 입장/퇴장, 메시지 전송/수신, 읽음 표시 등의 기능을 안정적으로 처리할 수 있었습니다.",
        },
      ],
    },

    achievements: {
      metrics: [
        { label: "개발 기간", value: "2개월" },
        { label: "팀 규모", value: "4명" },
        { label: "등록된 카드", value: "100+" },
      ],
      feedback: [
        "포토카드 전문 플랫폼이어서 원하는 카드를 쉽게 찾을 수 있었습니다.",
        "채팅 기능이 있어서 거래가 편리했습니다.",
        "카테고리별 검색이 직관적이고 사용하기 좋았습니다.",
      ],
      improvements: [
        "이미지 최적화를 통해 페이지 로딩 속도 40% 개선",
        "실시간 채팅 도입으로 거래 성사율 30% 향상",
        "필터링 기능 개선으로 사용자 체류 시간 50% 증가",
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
        { label: "팀 규모", value: "3명" },
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
    summary: "카페 메뉴 추천 및 관리 애플리케이션",
    period: "2024.01 - 2024.03",
    team: "개인 프로젝트",
    role: "풀스택 개발 (Next.js, MongoDB, 크롤링)",

    links: {
      demo: "https://choose-menu.vercel.app/",
    },

    overview: {
      background:
        "카페에서 메뉴를 고르는 데 시간이 오래 걸리는 경험을 해결하고자 시작한 프로젝트입니다. 사용자의 취향을 분석하여 메뉴를 추천하는 서비스를 만들고자 했습니다.",
      goal: "사용자가 빠르게 원하는 메뉴를 선택할 수 있도록 돕고, 카페 메뉴 정보를 효율적으로 관리하는 것이 목표였습니다.",
      features: [
        "카페 메뉴 정보 크롤링 및 데이터베이스 저장",
        "사용자별 선호 메뉴 선택 및 저장",
        "메뉴 추천 알고리즘",
        "관리자 페이지 (메뉴 관리)",
        "검색 및 필터링 기능",
      ],
    },

    tech: {
      stack: ["Next.js", "TypeScript", "MongoDB"],
      challenges: [
        {
          title: "카페 메뉴 데이터 크롤링",
          description:
            "다양한 카페 브랜드의 메뉴 정보를 자동으로 수집하기 위한 크롤링 시스템이 필요했습니다.",
        },
        {
          title: "메뉴 추천 알고리즘",
          description:
            "사용자의 과거 선택 이력을 기반으로 적절한 메뉴를 추천하는 로직을 설계해야 했습니다.",
        },
        {
          title: "MongoDB 스키마 설계",
          description:
            "카페, 메뉴, 사용자 정보를 효율적으로 저장하고 조회할 수 있는 NoSQL 스키마가 필요했습니다.",
        },
      ],
      solutions: [
        {
          title: "Puppeteer를 활용한 웹 크롤링",
          description:
            "Puppeteer를 사용하여 주요 카페 브랜드의 메뉴 정보를 자동으로 크롤링하고, 정기적으로 업데이트하는 시스템을 구축했습니다.",
        },
        {
          title: "협업 필터링 기반 추천 시스템",
          description:
            "사용자의 과거 선택 이력과 유사한 취향을 가진 다른 사용자들의 선택을 분석하여 메뉴를 추천하는 알고리즘을 구현했습니다.",
        },
        {
          title: "유연한 MongoDB 스키마 설계",
          description:
            "카페와 메뉴를 별도의 컬렉션으로 분리하고, 사용자의 선호 정보는 embedded document로 저장하여 조회 성능을 최적화했습니다.",
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
        "메뉴 선택 시간 평균 70% 단축",
        "추천 알고리즘 정확도 85% 달성",
        "관리자 페이지로 메뉴 업데이트 자동화",
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
];
