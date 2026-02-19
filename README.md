# 포트폴리오 페이지

> Next.js 16 + React 19 + TypeScript로 제작된 개인 포트폴리오 웹사이트

[![Deployment](https://img.shields.io/badge/Vercel-Deployed-success)](https://next-portfolio-ringring.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

## ✨ 주요 기능

- 🏠 **Home**: 간략한 자기소개 및 보유 기술 스택
- 📁 **Projects**: 진행한 프로젝트 포트폴리오 (5개 프로젝트)
  - 프로젝트 상세 페이지 (URL 및 모달 뷰 지원)
  - 프로젝트별 기술 스택, 챌린지, 해결책, 성과 등 상세 정보
  - 이미지 갤러리 (라이트박스 기능 지원)
- 🛠️ **Tech Stack**: 카테고리별 기술 스택 시각화
- 👤 **About**: 커리어 타임라인/작업 원칙/집중 분야 중심 내러티브 섹션
- 📧 **Contact**: 이메일 문의 폼 (nodemailer 연동)
- 🌓 **Dark Mode**: 다크/라이트 테마 지원
- 📱 **Responsive**: 모바일 친화적 반응형 디자인
- 🌍 **i18n**: 한국어/영어 전환 (`next-intl`)
- 🎭 **View Transitions**: React 19의 View Transition API를 활용한 부드러운 화면 전환

## 🧭 2026 리빌드 진행 상태

- ✅ **M1**: 디자인 토큰 재정의, 홈/레이아웃 비주얼 시스템 개편
- ✅ **M2**: About/Tech Stack 페이지를 데이터 중심 내러티브 구조로 확장
- ✅ **M3**: Projects 목록/상세를 스토리 중심 정보 구조로 개선
- ✅ **M4**: 접근성/SEO/성능 하드닝 + 린트 워크플로우 정비

## 🌐 배포

**프로덕션 배포**: [https://next-portfolio-ringring.vercel.app/](https://next-portfolio-ringring.vercel.app/)

## 🛠️ 기술 스택

### Core

- **Framework**: Next.js 16.1 (App Router)
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
├── app/                                    # Next.js App Router
│   ├── _provider/                         # 전역 Provider (Theme)
│   ├── layout.tsx                         # 루트 레이아웃
│   ├── [locale]/                          # 다국어 지원 라우팅
│   │   ├── page.tsx                       # 메인 페이지
│   │   ├── about/                         # 소개 페이지
│   │   ├── project/                       # 프로젝트 목록
│   │   │   ├── page.tsx                   # 프로젝트 목록 페이지
│   │   │   └── [slug]/                    # 프로젝트 상세
│   │   │       └── page.tsx               # 상세 페이지 (URL)
│   │   ├── @modal/                        # 병렬 라우트 (모달)
│   │   │   └── (.)project/[slug]/         # 인터셉팅 라우트
│   │   │       └── page.tsx               # 상세 페이지 (모달)
│   │   ├── tech-stack/                    # 기술 스택 페이지
│   │   └── contact/                       # 연락 페이지
│   └── page.tsx                           # 루트 리다이렉트
├── pages-layer/                           # 페이지별 컴포넌트
│   ├── main/                              # 메인 페이지
│   ├── about/                             # 소개 페이지
│   ├── project/                           # 프로젝트 페이지
│   │   ├── index.tsx                      # 프로젝트 목록
│   │   ├── [slug]/index.tsx               # 프로젝트 상세 페이지
│   │   └── item/                          # 프로젝트 카드 컴포넌트
│   ├── tech-stack/                        # 기술 스택 페이지
│   └── contact/                           # 연락 페이지
├── feature/                               # 기능별 모듈
│   └── mail/                              # 이메일 기능
│       ├── action/                        # Server Actions
│       ├── ui/                            # UI 컴포넌트
│       └── template/                      # Email 템플릿
└── shared/                                # 공유 리소스
    ├── ui/                                # 공통 UI 컴포넌트
    │   ├── modal.tsx                      # 모달 컴포넌트
    │   └── image-gallery.tsx              # 이미지 갤러리 (라이트박스)
    ├── constant/                          # 상수
    │   ├── project-detail.tsx             # 프로젝트 상세 데이터
    │   ├── tech-stack.tsx                 # 기술스택 데이터
    │   └── profile.ts                     # About/Tech narrative 데이터
    └── utils/                             # 유틸리티 함수
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 20.x 이상
- pnpm

### 설치

```bash
# 저장소 클론
git clone https://github.com/[your-username]/next-portfolio.git
cd next-portfolio

# 의존성 설치
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
# 린트
pnpm lint

# 단위 테스트
pnpm test

# 단위 테스트 UI
pnpm test:ui

# E2E 테스트
pnpm test:e2e

# E2E 테스트 (로그 포함)
pnpm test:e2e-log

# 배포 전 권장 검증
pnpm lint && pnpm test -- --run && pnpm build
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

### 고급 라우팅 패턴

- **병렬 라우트 (Parallel Routes)**: `@modal` 슬롯을 활용한 모달 UI
- **인터셉팅 라우트 (Intercepting Routes)**: `(.)project/[slug]`로 모달/페이지 이중 지원
- **동적 라우트 (Dynamic Routes)**: `[slug]` 기반 프로젝트 상세 페이지
- **generateStaticParams**: 빌드 타임에 모든 프로젝트 페이지 정적 생성

### React 19 기능 활용

- **View Transition API**: 페이지 전환 시 자연스러운 애니메이션
- **Server Components**: 기본 서버 컴포넌트로 성능 최적화
- **새로운 Hooks**: useLayoutEffect, startTransition 등 활용

### 이미지 갤러리 시스템

- **라이트박스 기능**: 클릭 시 전체 화면 이미지 뷰어
- **키보드 내비게이션**: 화살표 키로 이미지 이동, ESC로 닫기
- **반응형 그리드**: 1/2/3단 자동 조정 레이아웃
- **줌 애니메이션**: hover 시 부드러운 확대 효과

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
- ISR (Incremental Static Regeneration) 지원

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
