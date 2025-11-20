# 포트폴리오 페이지

> Next.js 16 + React 19 + TypeScript로 제작된 개인 포트폴리오 웹사이트

[![Deployment](https://img.shields.io/badge/Vercel-Deployed-success)](https://next-portfolio-ringring.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

## ✨ 주요 기능

- 🏠 **Home**: 간략한 자기소개 및 보유 기술 스택
- 📁 **Projects**: 진행한 프로젝트 포트폴리오 (4개 프로젝트)
- 🛠️ **Tech Stack**: 카테고리별 기술 스택 시각화
- 📧 **Contact**: 이메일 문의 폼 (nodemailer 연동)
- 🌓 **Dark Mode**: 다크/라이트 테마 지원
- 📱 **Responsive**: 모바일 친화적 반응형 디자인

## 🌐 배포

**프로덕션 배포**: [https://next-portfolio-ringring.vercel.app/](https://next-portfolio-ringring.vercel.app/)

## 🛠️ 기술 스택

### Core

- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript 5.9
- **Runtime**: React 19.2
- **Styling**: Tailwind CSS 4.1

### Features

- **Email**: Nodemailer + React Email
- **Theme**: next-themes (다크 모드)
- **UI Components**: Radix UI + Lucide Icons
- **Validation**: Zod 4.1
- **Animation**: tw-animate-css

### Testing

- **Unit Testing**: Vitest + Testing Library
- **E2E Testing**: Playwright
- **Coverage**: 단위 테스트 및 통합 테스트

### Architecture

- **Pattern**: Feature-Sliced Design (FSD)
- **Structure**: pages-layer, features, shared
- **Type Safety**: @t3-oss/env-nextjs

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── _provider/         # 전역 Provider (Theme)
│   ├── layout.tsx         # 루트 레이아웃
│   └── [pages]/           # 라우트 페이지들
├── pages-layer/           # 페이지별 컴포넌트
│   ├── main/              # 메인 페이지
│   ├── about/             # 소개 페이지
│   ├── project/           # 프로젝트 페이지
│   ├── tech-stack/        # 기술 스택 페이지
│   └── contact/           # 연락 페이지
├── feature/               # 기능별 모듈
│   └── mail/              # 이메일 기능
│       ├── action/        # Server Actions
│       ├── ui/            # UI 컴포넌트
│       └── template/      # Email 템플릿
└── shared/                # 공유 리소스
    ├── ui/                # 공통 UI 컴포넌트
    ├── constant/          # 상수 (프로젝트, 기술스택)
    └── utils/             # 유틸리티 함수
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 20.x 이상
- pnpm 또는 npm

### 설치

```bash
# 저장소 클론
git clone https://github.com/[your-username]/next-portfolio.git
cd next-portfolio

# 의존성 설치
npm install
# 또는
pnpm install
```

### 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=recipient@example.com
```

### 개발 서버 실행

```bash
# 일반 개발 모드
pnpm dev

# E2E 테스트 모드
pnpm dev:test
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 테스트

```bash
# 단위 테스트
pnpm test

# 단위 테스트 UI
pnpm test:ui

# E2E 테스트
pnpm test:e2e

# E2E 테스트 (로그 포함)
pnpm test:e2e-log
```

## 📌 포트폴리오 프로젝트

### 1. POCAZ

- **설명**: 아이돌 포토카드 전문 거래 플랫폼
- **역할**: 국내외 8000억 규모 아이돌 굿즈 시장을 겨냥한 포토카드 리셀 거래 플랫폼 개발
- **기술**: React, JavaScript, Tailwind CSS, Express.js, MySQL
- **링크**: [GitHub](https://github.com/TEAM-POCAZ/PocaZ)

### 2. 법률사무소 대도

- **설명**: 법률사무소 홈페이지 (관리자 페이지 포함)
- **역할**: 내부 라우터 설정, 공통 컴포넌트 작업, 소개 페이지 마크업, 데이터베이스 테이블 설계 및 관리자 페이지 개발
- **기술**: SvelteKit, Supabase, Tailwind CSS, TypeScript
- **링크**: [웹사이트](https://www.daedolaw.com/)

### 3. 메뉴 고르기 앱

- **설명**: 카페 메뉴 크롤링 및 선택 애플리케이션
- **역할**: 카페 메뉴 크롤링, 사용자별 메뉴 선택 및 관리자 기능 개발
- **기술**: Next.js, TypeScript, MongoDB
- **링크**: [웹사이트](https://choose-menu.vercel.app/)

### 4. 역대카

- **설명**: 렌트카 가격 비교 서비스
- **역할**: 렌트사 비교 및 최저가 추천 서비스 프로토타입 개발
- **기술**: Next.js, Supabase, Tailwind CSS, TypeScript
- **링크**: [웹사이트](https://alltime-car.com/)

## 💡 주요 특징

### Feature-Sliced Design (FSD)

- 모듈화된 아키텍처로 유지보수성 향상
- 계층별 명확한 책임 분리 (app, pages-layer, features, shared)

### Type Safety

- TypeScript strict mode
- Zod를 활용한 런타임 검증
- @t3-oss/env-nextjs로 환경 변수 타입 안전성 보장

### Testing Strategy

- 단위 테스트: Vitest + Testing Library
- E2E 테스트: Playwright (크로스 브라우저 지원)
- 테스트 커버리지 추적

### Performance

- Next.js App Router 활용
- 이미지 최적화 (next/image)
- Code splitting 자동 적용
- Server Actions를 통한 최적화된 데이터 처리

## 🌐 배포 정보

### Vercel

- **URL**: [https://next-portfolio-ringring.vercel.app/](https://next-portfolio-ringring.vercel.app/)
- **자동 배포**: main 브랜치 푸시 시
- **환경 변수**: Vercel 대시보드에서 설정
- **성능 모니터링**: Vercel Analytics

## 📧 연락처

- **Website**: [https://next-portfolio-ringring.vercel.app/](https://next-portfolio-ringring.vercel.app/)
- **Contact**: 웹사이트 내 Contact 페이지를 통한 이메일 문의

## 📝 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.

---

⭐️ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
