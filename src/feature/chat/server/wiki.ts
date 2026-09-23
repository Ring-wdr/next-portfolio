export const WIKI = `
## 기본 프로필
- 이름: Kim Manjoong (김만중)
- 직함: 프론트엔드 개발자
- 경력: React/Next.js/TypeScript 중심 3년 이상
- 소개: 명확한 프로덕트 인터페이스, 유지보수 가능한 프론트엔드 시스템, AI 에이전트 워크플로우에 집중하는 프론트엔드 개발자
- 포트폴리오: https://next-portfolio-ringring.vercel.app
- GitHub: https://github.com/Ring-wdr
- LinkedIn: https://www.linkedin.com/in/dust-shooter-408560340/

## 커리어 타임라인
- 2026: 포트폴리오 리빌드와 스토리 중심 구조화 — 스토리 중심 섹션, 토큰 기반 테마, 다국어 UX 일관성, 그리고 명시적인 AI 에이전트 엔지니어링 증거를 포함하도록 포트폴리오를 재설계했습니다.
- 2025: 프로덕트 중심 프론트엔드 전달력 강화 — 필터링, 모달 플로우, 컴포넌트 경계를 개선하며 여러 제품 인터페이스를 구현·배포했습니다.
- 2024: 현대적 React 생태계 기반 구축 — React, Next.js, TypeScript 역량을 확장하며 접근성과 성능 중심 개발 습관을 정립했습니다.

## 기술 스택
- 언어: JavaScript, TypeScript, HTML, CSS
- 프레임워크 & 라이브러리: React, Next.js, SvelteKit, Elysia.js, Express.js, Web Component, TanStack Query, XState
- 데이터베이스: PostgreSQL, MongoDB, MySQL, Supabase, Prisma
- 스타일링: Tailwind CSS, StyleX, Vanilla Extract
- 테스팅: Playwright, Vitest, Storybook
- 도구: Bun.js, Biome, GitHub, Figma, Command Line, Codex, Claude Code
- 백엔드: Next.js, SvelteKit, Elysia.js, Express.js, Supabase, Prisma, PostgreSQL

## 강점 & 집중 영역
- 강점: 깔끔한 코드, UI/UX 디자인, 접근성, 성능 최적화
- 현재 집중: React 아키텍처, 디자인 시스템, 성능 최적화, 에이전트 오케스트레이션

## 일하는 원칙
1. 제품 우선 판단: 사용자·비즈니스 목표를 먼저 정의하고 확장 가능한 최소 구현 선택
2. 디자인·코드 시스템화: 재사용 가능한 UI 프리미티브·토큰을 설계해 일관성 유지
3. 명확한 소통: 예측 가능한 네이밍·구조·문서화로 팀과 에이전트 모두 안전하게 실행

## 포트폴리오 웹사이트 (이 페이지)
- URL: https://next-portfolio-ringring.vercel.app
- 제작: Kim Manjoong 본인이 직접 설계 및 개발
- 프레임워크: Next.js (App Router)
- 스타일링: Tailwind CSS
- 배포: Vercel
- 주요 특징: 스토리 중심 섹션 구성, 토큰 기반 테마 시스템, 다국어 UX 지원, AI 챗봇 통합 (Cloudflare Worker + OpenRouter)
- 챗봇: 현재 대화 중인 AI 어시스턴트는 Cloudflare Worker 위에서 OpenRouter API를 통해 동작하며, 환각 방지를 위해 사전 정의된 지식 베이스(wiki)만 사용

## 주요 프로젝트 (총 6개)

### POCAZ Remake (2025.12 -)
- 분류: 1인 프로젝트
- 역할: 풀스택 개발 (Next.js, 상태관리, API 연동)
- 개요: 분산된 포토카드 리셀 거래를 검색·찜·채팅 중심 단일 경험으로 재구성한 리메이크 프로젝트
- 배경: 포토카드 리셀 수요는 커졌지만 실제 거래는 트위터, 번개장터, 당근마켓처럼 맥락이 분산된 플랫폼에 흩어져 있었습니다. 구매자는 원하는 카드의 상태와 가격을 비교하기 어렵고, 판매자는 거래 진행 상황을 한눈에 관리하기 어려운 문제가 있었습니다.
- 주요 기능: 포토카드 등록·상태 표기·거래 진행 상태를 한 화면에서 관리하는 판매 흐름, 아이돌/앨범/멤버 기준 검색 및 필터링, 실시간 채팅, 사용자 프로필·거래 히스토리·찜 목록, 알림 및 신고 흐름
- 기술 스택: React, Next.js, StyleX, Elysia.js, PostgreSQL, Prisma, Supabase, Bun.js
- 성과: 개발 상태 진행 중, 팀 규모 1명, 등록된 카드 100+
- 링크: GitHub(https://github.com/Ring-wdr/pocaz-remake), Demo(https://pocaz-remake.vercel.app/)
- 상태: Prototype (진행 중)

### 법률사무소 대도 (2023.03 - 2023.05)
- 분류: 2인 팀 프로젝트
- 역할: 프론트엔드 개발 (SvelteKit, 라우팅, 관리자 페이지)
- 개요: 법률사무소 공식 웹사이트 및 관리자 시스템
- 배경: 법률사무소 대도의 온라인 존재감 강화와 고객 상담 프로세스 개선을 위한 공식 웹사이트 및 관리자 시스템 구축 프로젝트였습니다.
- 주요 기능: 사무소 소개 및 변호사 프로필 페이지, 전문 분야별 법률 서비스 안내, 상담 예약 시스템, 법률 칼럼 및 소식 게시판, 관리자 페이지 (콘텐츠 관리), 반응형 디자인
- 기술 스택: SvelteKit, Supabase, Tailwind CSS, TypeScript
- 성과: 개발 기간 2개월, 팀 규모 2명, 페이지 수 15+, 콘텐츠 업데이트 시간 80% 단축, 상담 효율성 50% 향상
- 링크: Demo(https://www.daedolaw.com/)
- 상태: Live

### 메뉴 고르기 앱 (2024.01 - 2024.03)
- 분류: 개인 프로젝트
- 역할: 풀스택 개발 (Next.js, MongoDB, 크롤링)
- 개요: 메뉴 선택 시간을 줄이기 위해 크롤링·추천·운영 도구를 하나로 묶은 카페 메뉴 추천 서비스
- 배경: 브랜드별 메뉴가 빠르게 바뀌는 카페 환경에서는 사용자가 메뉴판 앞에서 오래 고민하거나, 자주 마시는 메뉴를 다시 찾는 데 불필요한 시간이 들었습니다.
- 주요 기능: 브랜드별 메뉴 정보를 수집해 저장하는 크롤링 파이프라인, 사용자 선호 메뉴를 저장하고 다시 불러오는 개인화 기능, 선택 이력 기반 메뉴 추천 로직, 운영자용 관리자 화면, 브랜드/카테고리 기준 검색과 필터링
- 기술 스택: Next.js, TypeScript, MongoDB, Puppeteer
- 성과: 개발 기간 2개월, 크롤링 메뉴 200+, 지원 카페 5개 브랜드
- 링크: Demo(https://choose-menu.vercel.app/)
- 상태: Live

### 역대카 (2024.06 - 2024.08)
- 분류: 개인 프로젝트
- 역할: 풀스택 개발 (Next.js, Supabase)
- 개요: 렌트카 가격 비교 및 추천 서비스
- 배경: 렌트카 업체마다 가격 정책이 다르고 비교하기 어려워, 사용자들이 합리적인 선택을 하기 힘든 문제를 해결하고자 시작했습니다.
- 주요 기능: 렌트카 업체별 가격 비교, 차량 종류별 필터링, 날짜 및 지역별 검색, 가격 추이 그래프, 최저가 알림 기능, 사용자 리뷰 및 평점
- 기술 스택: Next.js, Supabase, Prisma, Tailwind CSS, TypeScript
- 성과: 개발 기간 2개월, 지원 업체 10+, 등록 차량 150+, 렌트카 비교 시간 90% 단축, 평균 렌트 비용 15% 절감, 사용자 만족도 4.5/5.0
- 링크: Demo(https://alltime-car.com/)
- 상태: Live

### 프론트엔드 주니어 스터디 (2025.11 - 2026.01)
- 분류: 개인 프로젝트
- 역할: 커리큘럼 설계 및 학습 자료 정리
- 개요: 15주간의 체계적인 프론트엔드 학습 커리큘럼 레포지토리
- 배경: 프론트엔드 개발자로서 체계적인 학습의 필요성을 느끼고, 개인 학습 커리큘럼을 정리하기 위해 시작한 프로젝트입니다.
- 주요 기능: 1-5주 JavaScript 심화/디자인 패턴/React·Next.js 심화, 6-10주 스타일링/폼 관리/테스팅/애니메이션, 11-15주 성능 최적화/보안/PWA/접근성/개발 도구, 주차별 핵심 개념 요약 및 실습 예제 코드
- 기술 스택: TypeScript, Bun.js, CSS
- 성과: 학습 기간 15주, 주요 토픽 15개, 기술 스택 6개
- 링크: GitHub(https://github.com/Ring-wdr/frontend-junior-study), Demo(https://ring-wdr.github.io/frontend-junior-study/)
- 상태: Archived

### react-devtool-cli (2026.03 -)
- 분류: 개인 프로젝트
- 역할: CLI 설계 및 구현, Playwright 세션 전송 계층 구성, snapshot-aware React inspection과 profiler 워크플로우 설계, Codex/Claude Code 친화적 실행 표면 정리
- 개요: React inspection과 profiler 분석을 에이전트/개발자가 재현 가능한 결정론적 CLI 계약으로 옮긴 agent-first 디버깅 도구
- 배경: React DevTools UI만으로는 에이전트나 스크립트 기반 자동화 흐름에서 동일한 조사 과정을 재현하기 어렵습니다. React 트리 상태, source 힌트, profiler 신호를 명령형 인터페이스로 노출해 디버깅과 성능 분석을 자동화 가능한 형태로 만들 필요가 있었습니다.
- 주요 기능: session open/connect/attach 지원, snapshot id 기반 tree get·node search·node inspect·node highlight·source reveal 흐름, interact click/type/press/wait 명령, session doctor 사전 점검, commit 중심 profiler 분석 (summary/drill-down/ranked hotspot/flamegraph/compare/export), Codex·Claude Code·Gemini CLI용 번들 스킬 디렉터리 제공
- 기술 스택: React, Playwright, Command Line, JavaScript
- 성과: npm 버전 0.1.34, GitHub tag v0.1.34-public, 저장소 이력 35 commits
- 링크: GitHub(https://github.com/Ring-wdr/react-devtool-cli), npm(https://www.npmjs.com/package/react-devtool-cli)
- 상태: Live (진행 중)

## React 환경에서 선호하는 라이브러리

### Meta Framework
- **Next.js**: React 최신 사양을 가장 잘 따르며, AI 친화적 구조 덕분에 SSR·SEO 구현이 수월합니다. API 변화 속도가 빠른 편이라 피로감을 줄 수 있다는 단점이 있습니다.

### CSS Framework
- 프로젝트마다 CSS 프레임워크 하나를 주 스타일링 체계로 선택하는 편을 선호하며, 여러 CSS 프레임워크를 한 프로젝트에서 조합해 사용하는 방식은 지양합니다.
- **Tailwind CSS**: CSS 파일을 별도로 생성하지 않고, purge를 통해 불필요한 CSS가 발생하지 않습니다. AI 친화적인 특성도 장점입니다. 디자인 시스템이 확고한 프로젝트에서는 오히려 불리할 수 있습니다.
- **StyleX**: 사용법이 간단하고 atomic CSS를 고성능으로 생성하며, 디자인 시스템이 있을 때도 유리합니다. 다만 Babel 기반 빌드 타임 비용이 있고, 다른 CSS 프레임워크에 비해 초기 세팅 난이도가 약간 있는 편입니다.

### Plugin
- **React Compiler**: 수동 메모이제이션 부담을 줄이면서 동시에 성능 이점을 얻을 수 있습니다.

### Headless UI
- **React Aria**: 필요한 기능 구현과 접근성을 함께 챙길 수 있는 라이브러리입니다.

### Portal
- **Overlay Kit**: Portal 내부를 snapshot 형태로 격리해 성능 손실이 적고, 사용법도 간편합니다.

### Type Validation
- **Zod**: 업계 표준에 가깝게 자리잡은 라이브러리로, 많은 오픈소스와 호환됩니다. v4에서 성능도 개선되었습니다.

## AI 에이전트 비교

### 코딩 에이전트
- **Claude Code**: 프로그래밍용 에이전트 중 가장 활발히 사용합니다. 초기 탐색, 요구사항 보완, 계획 수립, 넓은 구현 흐름 오케스트레이션에 강합니다. 사용자의 부족한 부분을 스스로 메우며 빠르게 초안을 만드는 편이지만, 컨텍스트가 비대해지거나 복잡한 기능을 길게 구현할 때 의도에서 벗어난 작업을 수행하는 경우가 간헐적으로 있습니다.
- **Codex**: 요구사항의 경계가 이미 정해져 있고 사용자의 의도를 정확히 보존해야 하는 작업에서 특히 선호합니다. 기존 코드베이스 안에서 특정 파일 수정, 코드 리뷰, 테스트 보강, 회귀 위험이 있는 리팩터링처럼 범위 통제가 중요한 상황에서 강점이 있습니다. 또한 read-only 리뷰, adversarial review, 백그라운드 검증처럼 Claude Code가 진행한 작업을 다시 점검하거나 좁은 범위의 작업을 분리 위임하는 역할에도 잘 맞습니다. 컨텍스트가 길어져도 임의로 과업을 확장하기보다 주어진 범위를 지키는 편이라, 사용자가 요청하지 않은 방향으로 작업이 번지는 위험이 비교적 낮습니다. 대신 요구사항이 비어 있거나 제품 판단 자체를 에이전트가 먼저 만들어야 하는 탐색형 작업에서는 답변이 보수적으로 나오거나 기대한 품질에 못 미칠 수 있습니다.

### Codex를 주로 쓰는 상황
- 사용자가 원하는 수정 범위가 이미 좁혀져 있고, 그 범위를 벗어나지 않는 실행이 중요할 때
- 기존 저장소 안에서 특정 버그 수정, 리뷰 반영, 테스트 추가, 배포 전 마무리처럼 정확도가 속도보다 중요할 때
- 추측해서 넓게 제안하는 것보다, 현재 맥락과 명시된 요구사항 안에서 안정적으로 답하거나 작업해야 할 때
- CLI 중심 워크플로우, 재현 가능한 디버깅, diff 검토처럼 단계와 결과를 명확히 통제하고 싶은 작업일 때
- Claude Code가 먼저 탐색하거나 구현한 변경을 shipping 전 review, risk check, 회귀 가능성 점검 관점에서 다시 검증하고 싶을 때

### Codex가 덜 맞는 상황
- 문제 정의 자체가 불명확해서 에이전트가 먼저 제품 방향이나 기획을 크게 제안해야 할 때
- 요구사항보다 브레인스토밍, 탐색, 넓은 대안 제시가 더 중요한 초기 단계 작업일 때

### Claude Code와 Codex를 함께 쓰는 방식
- Claude Code로 문제를 탐색하고 구현 초안이나 큰 작업 흐름을 먼저 전개합니다.
- Codex는 그 결과를 read-only 리뷰하거나, adversarial review처럼 설계 선택과 리스크를 다시 물어보는 역할로 붙여 사용합니다.
- 장시간 걸리는 검증이나 별도로 떼어낼 수 있는 좁은 범위의 작업은 Codex 쪽으로 백그라운드 위임하는 방식이 잘 맞습니다.
- 정리하면 탐색과 오케스트레이션은 Claude Code, 검증과 범위 통제는 Codex라는 식으로 역할을 나눠 사용하는 편입니다.
- 일반적인 조합은 "Claude Code가 메인 세션을 진행하고, Codex를 reviewer 또는 rescue용 서브 에이전트처럼 붙이는 방식"입니다.

### 자주 받는 질문: Claude Code와 Codex는 어떻게 같이 써?
- 보통 Claude Code가 메인 에이전트로 탐색, 계획, 넓은 구현 흐름을 맡습니다.
- Codex는 그 세션 안에서 read-only 리뷰, adversarial review, 백그라운드 검증, rescue 성격의 좁은 작업 위임을 맡는 편입니다.
- 즉 "Codex가 전체 흐름을 대신 끌고 가고 Claude Code가 나중에 검토하는 방식"보다, "Claude Code가 진행하고 Codex가 점검하거나 일부 작업을 분리 수행하는 방식"에 더 가깝습니다.
- 배포 전 review, 리스크 검증, 회귀 가능성 점검처럼 현재 변경을 다시 압박해 보는 단계에서 이 조합이 특히 유용합니다.

### 자주 받는 질문: AI agent 사용시 어떤 상황에서 Codex를 사용해?
- Kim Manjoong는 Codex를 "이미 범위가 정해진 작업을 사용자의 의도에서 벗어나지 않게 끝내야 할 때" 주로 사용합니다.
- 대표적인 예시는 특정 파일 수정, 버그 픽스, 코드 리뷰 반영, 테스트 추가, 회귀 위험이 있는 리팩터링, 배포 전 마지막 점검입니다.
- Claude Code를 함께 쓰는 경우에도 Codex는 대체재라기보다 review, 검증, 좁은 범위 위임 역할로 붙이는 편입니다.
- 핵심 이유는 Codex가 추측으로 과업을 넓히기보다 현재 요구사항과 코드베이스 경계를 지키는 편이기 때문입니다.
- 반대로 요구사항이 모호하거나, 에이전트가 먼저 제품 방향과 대안을 넓게 제안해야 하는 탐색형 작업은 Claude Code를 더 자주 사용합니다.

### 추천 Claude Code 스킬
- **playwright-cli**: E2E 테스트를 에이전트가 자율적으로 수행하며, 토큰 소모량이 적으면서도 기능이 다양합니다.
- **impeccable**: AI스러운 디자인에서 탈피해 브랜드화된 디자인을 구현하는 데 적합합니다.
- **next-browser**: Next.js 프로젝트에서 기능 구현·성능 개선·디버깅에 용이합니다.
`.trim();
