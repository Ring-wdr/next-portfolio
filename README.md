# 포트폴리오 페이지

> Next.js 16 + React 19 + TypeScript로 제작된 개인 포트폴리오 웹사이트.
> 포트폴리오에 근거해 답하는 AI 어시스턴트와 채용공고(JD) 적합도 분석을 제공하며, 프로젝트 콘텐츠는 별도 저장소에서 Vercel Blob으로 배포됩니다.

[![Deployment](https://img.shields.io/badge/Vercel-Deployed-success)](https://next-portfolio-ringring.vercel.app/)
[![CI](https://github.com/Ring-wdr/next-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Ring-wdr/next-portfolio/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8)](https://tailwindcss.com/)
[![AI SDK](https://img.shields.io/badge/AI_SDK-7.0-black)](https://ai-sdk.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933)](https://nodejs.org/)

## ✨ 주요 기능

- 🏠 **Home**: 에디토리얼 레이아웃의 자기소개, `pretext` 기반 애니메이션 ASCII 히어로 캔버스, 히어로 영역에서 바로 질문하는 AI 어시스턴트 입력창
- 🤖 **AI Assistant**: 포트폴리오 지식 베이스와 프로젝트 케이스 스터디에 근거해 답하는 전역 채팅 위젯
  - OpenRouter 무료 모델 + Vercel AI SDK 스트리밍 (`/api/chat`)
  - 마크다운 렌더링, 프로젝트/페이지 링크 자동 연결, 프로젝트 상세 페이지의 "이 프로젝트에 대해 질문하기"
  - API 키가 없으면 프로젝트 링크 중심의 폴백 응답 제공
- 🎯 **Role Fit** (`/fit`): 채용공고를 붙여 넣으면 요구사항별 적합도(strong/partial/gap), 근거 프로젝트, 보완점, 면접 질문을 담은 리포트 생성 (`/api/fit`)
- 📁 **Projects**: 케이스 스터디 중심 프로젝트 포트폴리오
  - 프로젝트 상세 페이지 (URL 및 모달 뷰 지원)
  - 프로젝트별 기술 스택, 챌린지, 해결책, 성과 등 상세 정보
  - 이미지 갤러리 (라이트박스 기능 지원)
- 🛠️ **Tech Stack**: 카테고리별 기술 스택과 데모 패널(Shiki Magic Move 코드 전환), AI 에이전트 엔지니어링 증거 섹션
- 👤 **About**: 커리어 타임라인/작업 원칙/집중 분야 중심 내러티브 섹션
- 📧 **Contact**: 이메일 문의 폼 (Nodemailer + React Email, 요청 빈도 제한)
- 🌓 **Dark Mode**: 다크/라이트 테마 지원
- 📱 **Responsive**: 모바일 친화적 반응형 디자인
- 🌍 **i18n**: 한국어/영어 전환 (`next-intl`)
- 🎭 **View Transitions**: React의 `ViewTransition`을 활용한 라우트/모달 전환
- 🗂️ **Content from Blob**: 프로젝트 콘텐츠는 [`Ring-wdr/portfolio-content`](https://github.com/Ring-wdr/portfolio-content)에서 관리하고 Vercel Blob 매니페스트로 배포, 재빌드 없이 ISR로 반영
- 🔎 **SEO / Agent-readable**: 라우트별 메타데이터, 동적 OG/Twitter 이미지, 요청 시 렌더링되는 `sitemap.xml`, `robots.txt`, [`/llms.txt`](https://next-portfolio-ringring.vercel.app/llms.txt)

## 🧭 2026 리빌드 진행 상태

- ✅ **M1**: 디자인 토큰 재정의, 홈/레이아웃 비주얼 시스템 개편
- ✅ **M2**: About/Tech Stack 페이지를 데이터 중심 내러티브 구조로 확장
- ✅ **M3**: Projects 목록/상세를 스토리 중심 정보 구조로 개선
- 🟡 **M4**: 접근성/메타데이터/성능 하드닝과 자동화 검증 정비 진행 중

## 🌐 배포

**프로덕션 배포**: [https://next-portfolio-ringring.vercel.app/](https://next-portfolio-ringring.vercel.app/)

## 🛠️ 기술 스택

### Core

- **Framework**: Next.js 16.3.6 (App Router, React Compiler)
- **Language**: TypeScript 6.0
- **UI Library**: React 19.3
- **Styling**: Tailwind CSS 4.3
- **Runtime**: Node.js 24.x

### Features

- **AI**: Vercel AI SDK 7 (`ai`, `@ai-sdk/react`) + OpenRouter (`@openrouter/ai-sdk-provider`)
- **Content**: Vercel Blob (`@vercel/blob`) + `unstable_cache` 태그 기반 ISR
- **Markdown**: react-markdown + remark-gfm + rehype-sanitize
- **Code Highlight**: Shiki + Shiki Magic Move
- **Text Layout**: `@chenglou/pretext` (히어로 캔버스, 문장 레이아웃)
- **i18n**: next-intl 4
- **Email**: Nodemailer + React Email
- **Theme**: next-themes (다크 모드)
- **UI Components**: Radix UI Slot + class-variance-authority + Lucide Icons
- **Validation**: Zod 4.6
- **Analytics**: Google Analytics (`@next/third-parties`)
- **Animation**: tw-animate-css

### Testing

- **Unit Testing**: Vitest 5 + Testing Library (jsdom)
- **E2E Testing**: Playwright 1.63
- **Performance**: Playwright 기반 라우트 벤치마크 (`tests/benchmarks`)
- **CI**: GitHub Actions (lint → unit test → build → E2E smoke)

### Architecture

- **Pattern**: Feature-Sliced Design (FSD)
- **Structure**: app, pages-layer, feature, shared
- **Type Safety**: @t3-oss/env-nextjs
- **Architecture Note**: [`docs/architecture-tradeoffs.md`](docs/architecture-tradeoffs.md)

## 🤖 AI Agent Engineering Proof

- `/tech-stack`에서 `Codex`, `Claude Code`를 포함한 AI 에이전트 엔지니어링 섹션을 통해 작업 분해, 실행 표면, 검증 루프를 공개적으로 보여줍니다.
- 대표 증거 프로젝트는 `react-devtool-cli`이며, 에이전트/개발자 모두가 재현 가능한 CLI 계약을 어떻게 설계했는지 케이스 스터디로 연결됩니다.
- 저장소 차원의 작업 방식과 검증 기준은 [`docs/agent-engineering.md`](docs/agent-engineering.md)에 정리했습니다.
- 에이전트 하니스와 검증 문서의 패키지 매니저 표준은 `pnpm`입니다.
- 공개 주장과 증거 링크, 하니스 단계는 `src/shared/constant/agent-engineering.ts`에서 관리하며, 테스트로 회귀를 막습니다.

## 📁 프로젝트 구조

```
src/
├── app/                                    # Next.js App Router
│   ├── _provider/                         # 전역 Provider (Theme)
│   ├── layout.tsx                         # 루트 레이아웃
│   ├── page.tsx                           # 루트 리다이렉트
│   ├── [locale]/                          # 다국어 라우팅 (ko 기본, en)
│   │   ├── layout.tsx                     # 로케일 레이아웃 (헤더/푸터/채팅 위젯/GA)
│   │   ├── page.tsx                       # 메인 페이지
│   │   ├── about/                         # 소개 페이지
│   │   ├── project/                       # 프로젝트 목록 / [slug] 상세
│   │   ├── @modal/(.)project/[slug]/      # 병렬 + 인터셉팅 라우트 (모달 상세)
│   │   ├── fit/                           # 채용공고 적합도 분석
│   │   ├── tech-stack/                    # 기술 스택 페이지
│   │   ├── contact/                       # 연락 페이지
│   │   └── opengraph-image.tsx 등          # 동적 OG/Twitter 이미지
│   ├── api/
│   │   ├── chat/route.ts                  # AI 어시스턴트 스트리밍
│   │   ├── fit/route.ts                   # JD 적합도 리포트 생성
│   │   └── revalidate/route.ts            # 콘텐츠 퍼블리시 후 캐시 무효화
│   ├── llms.txt/route.ts                  # 에이전트용 포트폴리오 인덱스
│   ├── robots.ts
│   └── sitemap.ts
├── proxy.ts                               # next-intl 라우팅 (Next 16 proxy)
├── env.ts                                 # @t3-oss/env-nextjs 환경 변수 스키마
├── i18n/                                  # next-intl 설정
├── pages-layer/                           # 페이지별 컴포넌트
│   ├── main/                              # 메인 (히어로 캔버스, 히어로 질문창)
│   ├── about/
│   ├── project/                           # 목록, [slug] 상세, 카드
│   ├── fit/                               # 적합도 분석 UI
│   ├── tech-stack/                        # 쇼케이스, 에이전트 엔지니어링 패널
│   └── contact/
├── feature/                               # 기능별 모듈
│   ├── chat/                              # AI 어시스턴트 (lib / server / ui)
│   ├── fit/                               # 적합도 리포트 스키마 및 분석
│   └── mail/                              # 이메일 (action / ui / template)
└── shared/                                # 공유 리소스
    ├── content/                           # 프로젝트 콘텐츠 스키마, Blob 로더, 로컬 fixture
    ├── constant/                          # 사이트/프로필/기술 스택/에이전트 엔지니어링 데이터
    ├── ui/                                # 공통 UI (모달, 이미지 갤러리, 전환 링크, 토글 등)
    └── utils/
messages/                                  # ko.json / en.json 번역
tests/                                     # Playwright E2E 및 성능 벤치마크
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 24.x
- pnpm 10

### 설치

```bash
# 저장소 클론
git clone https://github.com/Ring-wdr/next-portfolio.git
cd next-portfolio

# 의존성 설치
pnpm install
```

### 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
# Email Configuration
NEXT_MAIL_ADDRESS=your-email@gmail.com
NEXT_APP_PASSWORD=your-app-password

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX

# AI Assistant / Role Fit (선택)
OPENROUTER_API_KEY=sk-or-...
# 쉼표로 구분한 OpenRouter 모델 ID, 첫 번째가 기본 모델 (선택)
OPENROUTER_FREE_MODELS=

# 프로젝트 콘텐츠 Blob 스토어 (선택, 둘 중 하나)
BLOB_STORE_ID=
BLOB_READ_WRITE_TOKEN=

# POST /api/revalidate 인증용 공유 시크릿, 16자 이상 (선택)
CONTENT_REVALIDATE_SECRET=
```

- `OPENROUTER_API_KEY`가 없으면 채팅은 폴백 응답을, `/api/fit`은 `503 unavailable`을 반환합니다.
- Blob 스토어가 설정되지 않으면 `src/shared/content/fixture/projects.json`의 fixture 데이터로 동작합니다.
- `SKIP_ENV_VALIDATION=true` 또는 `E2E_TESTING=true`로 환경 변수 검증을 건너뛸 수 있습니다 (CI 빌드에서 사용).

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

# 단위 테스트 (watch)
pnpm test

# 단위 테스트 UI
pnpm test:ui

# E2E 테스트
pnpm test:e2e

# E2E 테스트 (로그 포함)
pnpm test:e2e-log

# 성능 벤치마크
pnpm test:perf:quick
pnpm test:perf

# 배포 전 권장 검증 (CI와 동일)
pnpm lint && pnpm exec vitest run && SKIP_ENV_VALIDATION=true pnpm build
```

성능 측정 방법은 [`PERFORMANCE_TESTING.md`](PERFORMANCE_TESTING.md)를 참고하세요.

## 🗂️ 콘텐츠 파이프라인

프로젝트 케이스 스터디는 이 저장소가 아닌 [`Ring-wdr/portfolio-content`](https://github.com/Ring-wdr/portfolio-content)에서 관리합니다.

1. `portfolio-content`의 퍼블리시 워크플로우가 이미지를 업로드하고, 타임스탬프 이름의 불변 매니페스트를 Vercel Blob에 올립니다.
2. 이어서 `POST /api/revalidate`(`Authorization: Bearer $CONTENT_REVALIDATE_SECRET`)를 호출해 `projects` 캐시 태그를 즉시 만료시킵니다.
3. 사이트는 최신 매니페스트를 읽어 Zod 스키마(`src/shared/content/project-schema.ts`)로 검증한 뒤 렌더링합니다. 읽기에 실패하면 ISR이 마지막 정상 페이지를 계속 제공하며, 재검증 누락에 대비해 24시간 주기로도 갱신됩니다.
4. 페이지, AI 어시스턴트, 적합도 분석, `sitemap.xml`, `llms.txt`가 모두 같은 콘텐츠 소스를 사용해 서로 어긋나지 않습니다.

> 스키마를 변경할 때는 `portfolio-content`의 `scripts/schema.ts`도 함께 수정해야 합니다.

## 📌 대표 프로젝트

> 실제 콘텐츠의 원본은 [`Ring-wdr/portfolio-content`](https://github.com/Ring-wdr/portfolio-content)입니다.

### 1. POCAZ Remake

- **설명**: 아이돌 포토카드 리셀 거래를 전문 UX로 다시 설계한 리메이크 프로젝트
- **역할**: 1인 풀스택 개발 (Next.js, 상태관리, API 연동)
- **기술**: React, Next.js, StyleX, Elysia.js, PostgreSQL, Prisma, Supabase, Bun.js
- **링크**: [GitHub](https://github.com/Ring-wdr/pocaz-remake) · [Demo](https://pocaz-remake.vercel.app/)

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
- **역할**: 개인 프로젝트 풀스택 개발 (Next.js, Supabase)
- **기술**: Next.js, Supabase, Prisma, Tailwind CSS, TypeScript
- **링크**: [웹사이트](https://alltime-car.com/)

### 5. 프론트엔드 주니어 스터디

- **설명**: 15주 학습 커리큘럼과 실습 기록을 구조화한 공개 학습 저장소
- **역할**: 커리큘럼 설계 및 학습 자료 정리
- **기술**: TypeScript, Bun.js, CSS
- **링크**: [GitHub](https://github.com/Ring-wdr/frontend-junior-study) · [Demo](https://ring-wdr.github.io/frontend-junior-study/)

### 6. react-devtool-cli

- **설명**: Playwright 기반 브라우저 세션 위에서 React inspection과 profiler 분석을 자동화하는 agent-first CLI
- **역할**: CLI 설계 및 구현, Playwright 전송 계층 구성, snapshot-aware inspection 워크플로우 설계
- **기술**: React, Playwright, Command Line, JavaScript
- **링크**: [GitHub](https://github.com/Ring-wdr/react-devtool-cli) · [npm](https://www.npmjs.com/package/react-devtool-cli)

## 💡 주요 특징

### Feature-Sliced Design (FSD)

- 모듈화된 아키텍처로 유지보수성 향상
- 계층별 명확한 책임 분리 (app, pages-layer, feature, shared)

### 고급 라우팅 패턴

- **병렬 라우트 (Parallel Routes)**: `@modal` 슬롯을 활용한 모달 UI
- **인터셉팅 라우트 (Intercepting Routes)**: `(.)project/[slug]`로 모달/페이지 이중 지원
- **동적 라우트 (Dynamic Routes)**: `[slug]` 기반 프로젝트 상세 페이지
- **Proxy**: Next.js 16의 `proxy.ts`로 next-intl 로케일 라우팅 (`localePrefix: "as-needed"`)

### React 19 기능 활용

- **ViewTransition**: 라우트 및 모달 전환 애니메이션
- **Server Components / Server Actions**: 기본 서버 컴포넌트, 이메일 전송은 Server Action
- **React Compiler**: `reactCompiler: true`로 자동 메모이제이션

### Grounded AI

- 채팅과 적합도 분석 모두 위키 + 프로젝트 콘텐츠에서 생성한 지식 베이스만 근거로 사용하도록 프롬프트 구성
- 적합도 리포트는 Zod 스키마로 검증하고, 존재하지 않는 프로젝트 slug는 제거해 모든 근거 링크가 실제 케이스 스터디를 가리키도록 보장
- OpenRouter 무료 모델을 순서대로 폴백하며, 모델 목록은 환경 변수로 교체 가능

### 이미지 갤러리 시스템

- **라이트박스 기능**: 클릭 시 전체 화면 이미지 뷰어
- **키보드 내비게이션**: 화살표 키로 이미지 이동, ESC로 닫기
- **반응형 그리드**: 1/2/3단 자동 조정 레이아웃
- **줌 애니메이션**: hover 시 부드러운 확대 효과

### Type Safety

- TypeScript strict mode
- Zod를 활용한 런타임 검증
- @t3-oss/env-nextjs로 환경 변수 타입 안전성 보장
- 외부 콘텐츠 매니페스트도 Zod 스키마로 검증

### Testing Strategy

- 단위 테스트: Vitest + Testing Library (API 라우트, 콘텐츠 스키마, 페이지 컴포넌트)
- E2E 테스트: Playwright (Desktop/Mobile Chrome 스모크는 CI에서 실행)
- 성능 회귀: `performance-regression` 워크플로우와 라우트 벤치마크

### Performance

- Next.js App Router 활용
- 이미지 최적화 (next/image)
- Code splitting 자동 적용
- Server Actions를 통한 최적화된 데이터 처리
- 태그 기반 ISR로 콘텐츠 변경 시 재빌드 없이 반영

## 🌐 배포 정보

### Vercel

- **URL**: [https://next-portfolio-ringring.vercel.app/](https://next-portfolio-ringring.vercel.app/)
- **자동 배포**: main 브랜치 푸시 시
- **Functions**: Fluid Compute (`/api/chat`, `/api/fit` 최대 300초)
- **환경 변수**: Vercel 대시보드에서 설정
- **분석**: Google Analytics (`@next/third-parties`)

## 📧 연락처

- **Website**: [https://next-portfolio-ringring.vercel.app/](https://next-portfolio-ringring.vercel.app/)
- **Contact**: 웹사이트 내 Contact 페이지를 통한 이메일 문의

## 📝 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.

---

⭐️ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
