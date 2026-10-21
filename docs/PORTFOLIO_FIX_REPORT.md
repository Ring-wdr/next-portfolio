# 포트폴리오 개선 작업 보고 (docs/PORTFOLIO_FIX.md 기준)

작업 브랜치: `portfolio-fix/persona-review` (next-portfolio, portfolio-content 두 저장소 모두 같은 이름)

## 0. 작업 전 파일 위치

| 구분 | 위치 |
|---|---|
| 프로젝트 데이터 (실제) | `Ring-wdr/portfolio-content` 의 `projects.json`, `images/` (Vercel Blob으로 배포, main push 시에만 publish) |
| 프로젝트 데이터 스키마 | `src/shared/content/project-schema.ts` (사이트) / `scripts/schema.ts` (콘텐츠 저장소), 둘을 같이 바꿈 |
| 프로젝트 데이터 (테스트/CI용) | `src/shared/content/fixture/projects.json` |
| 페이지 카피 (ko/en) | `messages/ko.json`, `messages/en.json` |
| about / timeline / 원칙 데이터 | `src/shared/constant/profile.ts`, `src/pages-layer/about/index.tsx` |
| 메타데이터 / OG | `src/shared/constant/site.ts`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/**/page.tsx`, `src/app/[locale]/opengraph-image.tsx`, `src/app/llms.txt/route.ts` |
| 챗봇 지식 | `src/feature/chat/server/wiki.ts`, `src/feature/chat/server/knowledge.ts`, `src/feature/chat/server/prompt.ts` |
| 화면 컴포넌트 | `src/pages-layer/{main,about,project,project/[slug],tech-stack,contact}`, `src/shared/ui/{header,footer,image-gallery}.tsx` |
| 기술 스택 데이터 | `src/shared/constant/tech-stack.tsx`, `src/shared/constant/agent-engineering.ts` |

검증에 쓴 외부 저장소(읽기 전용): `Ring-wdr/pocaz-remake`, `Ring-wdr/react-devtool-cli`, `Ring-wdr/ticket-sim`, `Ring-wdr/frontend-junior-study`. 라이브 사이트: alltime-car.com, daedolaw.com, choose-menu.vercel.app, npm registry.

배포 순서 주의: 사이트(next-portfolio)를 먼저 배포한 뒤 portfolio-content를 main에 머지해야 합니다. 새 스키마 필드는 모두 선택값이라 새 사이트는 옛 매니페스트를 그대로 읽지만, 옛 사이트는 새 매니페스트(예: Phase 2의 `Work` 카테고리)를 읽지 못해 마지막 정상 페이지를 계속 보여 줍니다.

---

## Phase 1. 신뢰도 복구

### 1. 변경 파일과 요약

next-portfolio
- `src/shared/content/project-schema.ts`: `team`, `role` 선택값으로 변경, 렌더링하지 않는 `todo` 메모 필드 추가, `todo` 밖의 문자열에 `TODO`가 있으면 매니페스트 검증 실패
- `src/pages-layer/project/[slug]/index.tsx`: 기간/팀/역할 중 값이 있는 것만 표시, 지표·피드백·배운 점이 비면 해당 블록과 "성과" 섹션 자체를 숨김
- `src/pages-layer/project/item/index.tsx`, `src/shared/content/project.ts`: 역할이 없으면 카드에서 역할 줄 숨김
- `src/pages-layer/project/index.tsx`: 기본 보기를 "전체"로 변경 (전체 카운트와 표시 개수 일치)
- `src/pages-layer/about/index.tsx`, `src/pages-layer/main/index.tsx`: 연차 "3+"를 "4년"으로, "출시한 프로젝트 N+"를 "공개 프로젝트 N"(정확한 개수, + 제거)으로
- `messages/{ko,en}.json`: /project 상단 "포함될 것입니다" 문구 교체, /about 소개를 2절 사실 기반 4문장으로 교체, 연차 라벨 "실무 경력", showcase 카피 삭제
- `src/pages-layer/tech-stack/*`, `src/shared/constant/tech-stack.tsx`, `src/app/globals.css`, `package.json`: "초보 코드에서 전문가 시스템으로" before/after 위젯과 카테고리별 데모 제거(교체할 실제 리팩터링 사례 없음), `shiki`, `@shikijs/magic-move` 의존성 제거
- `src/feature/chat/server/{wiki,knowledge}.ts`, `src/app/llms.txt/route.ts`: "3년 이상"을 "실무 4년"으로, 비어 있는 팀/역할/피드백은 출력하지 않음
- 테스트: `project.test.ts`(TODO 차단, 메시지 파일 TODO 0건), `tech-stack-page.test.tsx` 재작성, `tests/tech-stack.spec.ts` 갱신

portfolio-content (`projects.json`, `scripts/schema.ts`)
- 역대카: 90%/15%/4.5 만족도/사용자 피드백 삭제. 실제 서비스(신차 장기렌트 가격 추적)에 맞게 요약·배경·목표·기능 수정. 해결책이 없던 "실시간 가격 수집" 챌린지 삭제, 나머지 두 챌린지와 해결책 재매칭. 근거 없는 지원 업체 10+, 등록 차량 150+ 삭제, 지표는 "운영 도메인 alltime-car.com"만. 성격과 역할은 미확정이라 `team`/`role` 제거 후 `todo`에 기록
- 법률사무소 대도: 80%/50% 수치("배운 점" 칸), 사용자 피드백, 페이지 수 15+ 삭제
- POCAZ: Socket.io 해결책을 Supabase Realtime(ChatMessage INSERT 구독, 멤버별 lastReadAt)으로 수정. 팀 표기 "과거 팀 프로젝트를 혼자 다시 구현한 리메이크". 사용자 피드백, 팀 규모 1명, 등록된 카드 100+ 삭제
- 메뉴 고르기: 확인할 수 없는 크롤링 메뉴 200+, 지원 카페 5개 브랜드 삭제
- 프론트엔드 주니어 스터디: Rstest 챌린지에 실제 해결책(rstest.config.ts의 React 플러그인, jsdom, setup 파일, 주제별 테스트 폴더) 매칭, Biome은 Rsbuild 해결책에 합침. 근거 없는 "기술 스택 6개" 지표 삭제
- react-devtool-cli: npm 버전 0.2.0(npm registry `latest`, package.json 확인), 배포 방식 "npm OIDC trusted publishing"(publish.yml의 `id-token: write`, `--provenance`). Release 링크는 `/releases/latest`로 바꿔 버전을 지표 한 곳에서만 관리
- 카피 안의 화살표(→, ↔) 제거

### 2. grep / 테스트 결과

검사 범위: `messages/*.json`, `src/**/*.{ts,tsx}`(테스트·fixture 제외), `portfolio-content/projects.json`

| 패턴 | 결과 |
|---|---|
| `[0-9]%` | 0건 (CSS `100%` 등 스타일 값만 있음) |
| `만족도` | 0건 |
| 피드백 인용 데이터(`"feedback": [...]`) | 0건 (라벨 키 `ProjectDetailPage.feedback`만 남음, 데이터가 없으면 렌더링 안 됨) |
| `포함될 것입니다` | 0건 |
| `3+` | 1건: `/fit` 예시 채용공고의 자격 요건("3+ years of professional TypeScript") — 사이트 주인에 대한 서술이 아니라 예시 JD 문구라 유지 |
| `학습 연차` | 0건 |
| `Socket` | 0건 |
| `0.1.34` | 0건 |

`pnpm lint && pnpm test -- --run && pnpm build`: 통과 (lint 0 errors / 기존 경고 1건, 테스트 61개 통과, 빌드 성공). `pnpm validate`(portfolio-content): 통과.

### 3. 스크린샷

라이브 사이트(수정 전)와 로컬 빌드(수정 후, portfolio-content 브랜치 콘텐츠 사용)를 390×844, 1440×900에서 캡처했습니다. 파일은 저장소에 커밋하지 않고 작업 보고와 함께 전달합니다. 변경된 화면: `/project/alltime-car`, `/project/daedo-law`, `/about`, `/tech-stack`, `/project`.
- `/tech-stack` 390px scrollWidth: 수정 전 580 > 390, 수정 후 390 (위젯 제거로 가로 스크롤 해소)

### 4. 남은 TODO(user)

| 위치 | TODO | 질문 |
|---|---|---|
| 역대카 | 프로젝트 성격, 팀 구성 | 역대카는 개인 프로젝트, 외주, 참여 중 어느 것인가요? 사이트 사업자(에이치다이렉트카)와의 관계와 팀 구성을 알려 주세요. |
| 역대카 | 본인 역할과 범위 | 어떤 화면/기능/서버 부분을 맡았나요? |
| 역대카 | 견적/계약 건수 기여 | 사이트에 보이는 총 견적·계약 건수 중 본인 작업과 연결해 말할 수 있는 부분이 있나요? (없으면 쓰지 않습니다) |
| 역대카 | 개발 기간 | 2024.06 - 2024.08이 맞나요? 운영 중인 지금까지 유지보수를 하고 있나요? |
| 역대카 | 챌린지 내용 | "비교 조건 표준화", "복합 인덱스" 해결책이 실제로 한 일이 맞나요? |
| 법률사무소 대도 | 운영 규모 | 페이지 수 등 확인 가능한 규모 값이 있나요? |
| POCAZ | 원 프로젝트 팀 구성과 리메이크 범위 | 원래 팀 프로젝트의 인원과 본인 역할, 리메이크에서 새로 만든 범위(전부 새로 작성했는지)를 알려 주세요. |
| 메뉴 고르기 | 크롤링 규모 | 기존의 "메뉴 200+, 5개 브랜드"에 근거(DB 수치 등)가 있나요? |

모든 TODO는 `projects.json`의 `todo` 필드(렌더링 안 함)에만 있고, 검증 스크립트가 다른 필드의 TODO를 막습니다.

### 5. 보류한 항목

- 역대카 `card.category`는 `Product`로 유지했습니다. 성격이 외주로 확인되면 `Client`로 바꿔야 합니다.
- 영어 카피의 회사명: 스캐터엑스는 도메인(scatterx.co.kr)에 맞춰 ScatterX로 썼고, 슈가브릭스·시스웨어는 공식 영문 표기를 몰라 한글로 두었습니다.
- 메뉴 고르기의 "협업 필터링 기반 추천" 등 외부에서 확인할 수 없는 기술 서술은 지시서 범위 밖이라 그대로 두었습니다.

---

## Phase 2. 경력과 포지셔닝

### 1. 변경 파일과 요약

next-portfolio
- `src/pages-layer/about/index.tsx`, `src/shared/constant/profile.ts`, `messages/*`: /about 상단을 이름·역할·소개(사실 4문장)·통계로 정리하고, 바로 아래에 확정 경력 블록(스캐터엑스, 슈가브릭스, 시스웨어, 최신순)을 넣음. 시스웨어는 "개발 / ERP 개발" 한 줄만. 스캐터엑스 항목에 XMORSE 2.0 케이스 스터디 링크. 기존 "2026 포트폴리오 리빌드 / 2025 / 2024" 타임라인은 삭제(개인 작업은 /project에 있음). 반복되던 /about 대형 문구(heroStatement)와 portraitCaption 삭제
- `src/pages-layer/main/index.tsx`: 히어로 eyebrow "Frontend · Product Engineer", 헤드라인과 서브를 확정 문장으로 교체, 히어로 하단에 "실무 4년 차 · 데이터 시각화 SaaS 3년 · Next.js 마이그레이션 구조 설계". "현재 집중: Next.js 16 / 에이전트 하니스 설계" 통계 삭제. "일하는 방식"은 큰 제목 하나만 남기고(PretextStatement 삭제), 세 원칙을 XMORSE 2.0의 확정 사실(구조 설계, API 계약, 테스트)로 교체. 하단 CTA 문구 교체
- `src/shared/constant/site.ts`, `src/app/[locale]/opengraph-image.tsx`, `layout.tsx`, `about/page.tsx`, `project/page.tsx`, `src/app/llms.txt/route.ts`: title "Manjoong Kim | Frontend · Product Engineer", 설명·OG·JSON-LD jobTitle·llms.txt 소개를 새 포지셔닝으로
- `src/shared/content/project-schema.ts`: `Work` 카테고리, `organization`, `shortTitle`, `narrative`, `diagram`, 갤러리 `hidden`/`source`, `overview.goal` 선택값
- `src/pages-layer/project/[slug]/index.tsx`: 회사 정보 표시, 내러티브 섹션, 구조 다이어그램, 빈 기능/챌린지 섹션 숨김, `hidden` 갤러리 이미지 제외, SVG 썸네일은 잘리지 않게 표시하고 썸네일과 같은 다이어그램은 한 번만 표시
- `src/shared/utils/image.ts`: SVG는 이미지 최적화를 건너뜀
- `next.config.ts`, `src/shared/constant/contact.ts`, `src/shared/ui/header.tsx`: 빌드 시 `public/resume.pdf`가 있을 때만 헤더(데스크탑, 모바일 메뉴)와 /contact에 "이력서" 버튼 렌더링
- `src/pages-layer/contact/*`, `src/feature/mail/ui/email-form.tsx`: 이메일 주소 텍스트와 복사 버튼, 필수 항목 `*` 표시와 안내
- `src/feature/chat/server/{wiki,prompt,model}.ts`, `src/feature/fit/server/analyze.ts`, `messages/*`: "Kim Manjoong"을 "Manjoong Kim"으로 통일, 챗봇 지식에 확정 경력과 AI 도구 사용 이력 반영
- `docs/agent-engineering.md`: "Codex가 주 실행 도구" 서술을 확정 AI 사용 이력 문단으로 교체, 없는 파일 경로 정리
- 테스트: fixture에 XMORSE(Work, 다이어그램, 숨김 이미지) 추가, `tests/about.spec.ts`(경력 블록), `tests/main.spec.ts`(요약 줄, title에 Frontend Portfolio 없음)

portfolio-content
- `projects.json`: 목록 맨 앞에 `xmorse` 케이스 스터디. 제목, 메타(스캐터엑스 · 2024.11 ~ 2026.03 · FE 2 / BE 4 / Infra 3 · 역할), 한 줄 요약, 배경, 프레임워크 결정, 구조 설계, 임베드 화면, 서버 렌더링 차트 그리드, 검증, 결과를 확정 문장 그대로 사용. 카드의 임팩트/결과는 확정 경력 문장 그대로
- `images/xmorse-architecture.svg`: 레거시(JSP+Spring 같은 포트)와 이후(Next.js 안의 세 화면과 공통 시각화 코어, FSD 참고 화면 계층, openapi-fetch API 계층, 별도 Spring 서비스의 OpenAPI 스펙에서 openapi-typescript 타입 생성) 구조도. 확정 콘텐츠에 있는 내용만 그렸고 썸네일로도 씀
- 이미지 블록: 스캐터엑스 제품 페이지 이미지는 받지 않았고 `gallery`는 비워 둠. 허락 후 넣는 방법(캡션, 출처 링크, `hidden`)을 `todo`에 적어 둠
- `scripts/schema.ts`, `scripts/publish.mts`: 사이트 스키마와 같은 필드 추가, 다이어그램 이미지도 업로드

### 2. 검증

- `pnpm lint && pnpm test -- --run && pnpm build`: 통과 (0 errors, 기존 경고 1건, 테스트 61개)
- Playwright(Chromium, 로컬): `tests/main.spec.ts`, `tests/about.spec.ts`, `tests/tech-stack.spec.ts`, `tests/contact.mobile.spec.ts` 4개 통과
- grep (src, messages): `Frontend Portfolio` 0, `프론트엔드 엔지니어 포트폴리오` 0, `Kim Manjoong` 0, `움직임까지 설계된` 0, `표면과 시스템` 0, `노이즈 없는` 0
- 완료 기준: 홈 첫 화면(390, 1440 모두)에서 "실무 4년 차", "데이터 분석·시각화 SaaS 회사에서 3년간", "jQuery로 만든 분석 플랫폼을 Next.js로 옮기는 작업에서 구조 설계"가 보임. title/OG에 FE 전용 문구 없음

### 3. 스크린샷

수정 후: `/`, `/about`, `/project`, `/project/xmorse`, `/contact` (390, 1440). 수정 전: 라이브 사이트 같은 화면.

### 4. 남은 TODO(user) (Phase 1 목록에 추가)

| 위치 | TODO | 질문 |
|---|---|---|
| XMORSE | 제품 페이지 이미지 사용 허락 | 스캐터엑스 제품 페이지(https://scatterx.co.kr/ko/products/xmorse/) 갤러리 이미지 1~2장을 포트폴리오에 써도 되는지 회사에 확인하셨나요? 허락되면 어떤 이미지를 쓸까요? |
| XMORSE | 운영 상태 | XMORSE 2.0이 지금 서비스 중인가요? (카드에 "운영 중"으로 표시됨) |
| 이력서 | `public/resume.pdf` | 이력서 PDF를 `public/resume.pdf`로 넣어 주세요. 넣고 다시 배포하면 버튼이 나타납니다. |
| 영문 회사명 | 슈가브릭스, 시스웨어 | 영어 페이지에 쓸 공식 영문 회사명이 있나요? (지금은 한글 표기) |

### 5. 보류한 항목

- 홈 히어로 아래 한 줄은 2-1의 "jQuery에서 Next.js로 마이그레이션 구조 설계"가 아니라 작성자 검토가 끝난 확정 콘텐츠의 "Next.js 마이그레이션 구조 설계"를 썼습니다.
- /about의 "강점"(깔끔한 코드, UI/UX 디자인, 접근성, 성능 최적화)과 "현재 집중 영역"은 지시서 범위 밖이라 그대로 두었습니다. 일반론에 가까워 지우거나 근거를 붙일지 정해 주세요.
- 영어 경력 문장은 확정 한국어 문장을 뜻이 같게 옮긴 것입니다. 영문 이력서 표현이 따로 있으면 맞추겠습니다.
- `next dev`가 실행될 때마다 `AGENTS.md`의 Next.js 블록을 다시 쓰면서 "pnpm을 쓴다"는 저장소 규칙 줄을 지웁니다. 이 변경은 커밋하지 않았습니다. 규칙을 블록 밖으로 옮기는 것을 권합니다.

---

## Phase 3. 프로젝트 서술 재구성

### 1. 변경 파일과 요약

next-portfolio
- `src/shared/content/project-schema.ts`: `brief`(audience, problem, contribution, outcome, 각각 선택값), 챌린지의 `plain`(비개발자용 한 줄)
- `src/pages-layer/project/[slug]/index.tsx`: 상단 요약 박스(누구를 위한 것인가 / 어떤 문제였나 / 내가 한 일 / 결과, 값이 있는 줄만), 챌린지마다 한 줄 요약을 먼저 표시, 기술 스택은 작은 태그로 페이지 하단, 히어로 이미지 16:10
- `src/pages-layer/project/item/index.tsx`: 카드에 서비스 설명과 결과 문장을 먼저, 기술은 작은 태그로. "프로젝트 스토리" 칩과 "임팩트/결과" 라벨 제거, 썸네일 16:10 고정 + `object-top`
- `src/pages-layer/project/index.tsx`: 기술 필터 칩(30개 이상)을 기본 접힘 "기술로 필터" 토글 안으로, 모바일에서 통계 카드 숨김
- `src/pages-layer/main/index.tsx`: 홈 대표 작업 목록에 기술 나열 대신 서비스 설명, 썸네일 16:10
- `src/shared/ui/image-gallery.tsx`: 썸네일 16:10, `object-top`
- `src/pages-layer/tech-stack/agent-engineering-panel.tsx`, `src/shared/constant/agent-engineering.ts`, `messages/*`: AI 섹션을 카드 3개 + 4단계 하니스에서 확정 도입 문단, 결과 3줄, 검증 명령, 링크 2개로 축소
- 테스트: `project-detail.test.tsx`(요약 박스, 숨김 이미지, 빈 섹션, 한 줄 요약), `agent-engineering.test.ts`, `tests/tech-stack.spec.ts` 갱신
- fixture: Phase 2 커밋 직전 미리보기 스크립트가 fixture를 되돌리면서 빠진 XMORSE 항목을 다시 넣음

portfolio-content
- 모든 프로젝트에 `brief`와 챌린지 `plain` 추가. 확인되지 않은 칸(역대카·대도의 "내가 한 일", 대도의 "어떤 문제였나")은 비워 두어 렌더링하지 않음
- POCAZ(풀스택 대표작): 저장소에서 확인한 내용으로 챌린지/해결책 5개를 새로 씀. Elysia를 `src/app/api/[[...slugs]]/route.ts`에 마운트하고 Eden 클라이언트로 타입 공유(트레이드오프: Next 서버가 Node라 Bun 전용 기능 금지), Prisma는 서버 DB 접근 전담·Supabase는 Auth/Storage/Realtime, public 테이블 전체 RLS와 ChatMessage 멤버 읽기 정책, ChatRoomMember의 (roomId, userId) 유니크와 lastReadAt 기반 안 읽은 수, 테스트 파일 59개(API 23, UI 26, 유틸 6, lib 4, 직접 셈), 좋아요 API 5초 10회 제한, Prisma 마이그레이션 8개와 `db:migrate:prod`(prisma migrate deploy). "Intersection Observer 이미지 lazy loading" 서술은 저장소에서 확인되지 않아 삭제(IntersectionObserver는 채팅/알림 목록에만 있음). 아키텍처 다이어그램(`images/pocaz-architecture.svg`)
- 티키타카 TICKET: "왜 만들었나, 누가 쓰나" 요약 박스, 구조 다이어그램(`images/ticket-sim-architecture.svg`: 메인 스레드 Preact와 Web Worker 가상 서버, clock/miniRedis/queueService/bookingEngine/mq/rateLimiter, 고정 시드, 도착 분포 곡선, Vitest)
- Travel Records: 기존 서술(OffsetTimeOriginal, 180km/h, 700m, Zod 빌드 게이트, 4개국 36일 626장) 유지, 요약 박스 추가
- 법률사무소 대도: 비개발자용 배경·목표·기능으로 재작성(라이브 사이트에서 확인한 기능 위주), "SvelteKit 라우팅 학습" 챌린지 삭제, 역할은 챌린지(DB, RLS)와 범위가 맞지 않아 제거 후 TODO. 운영 도메인 지표 추가
- react-devtool-cli: 요약을 쉬운 한 줄로("React 앱 안의 컴포넌트 상태와 렌더링 성능을 터미널 명령으로 확인하는 개발 도구"), 역할·배운 점의 "실행 표면" 같은 표현 정리, 문서 사이트 링크 추가
- 프론트엔드 주니어 스터디: 저장소와 라이브 사이트가 22주인데 사이트에는 15주로 적혀 있어 22주로 수정, 테스트 파일 11개 지표
- 스크린샷: Playwright로 라이브 사이트를 캡처해 갤러리를 1장에서 2~3장으로(Travel Records, POCAZ, 티키타카, react-devtool-cli, 주니어 스터디, 역대카, 대도). 캡션은 화면에 보이는 것만 적음
- 핫링크: `postfiles.pstatic.net` 이미지를 `images/daedo-law.png`로 옮김(`projects.json`에서 0건). 대도 썸네일은 사이트 첫 화면 캡처로 바꿈

### 2. 검증

- `pnpm lint && pnpm test -- --run && pnpm build`: 통과 (0 errors, 기존 경고 1건, 테스트 63개)
- `pnpm validate`(portfolio-content): 통과 (이미지 참조 전부 존재)
- grep: `postfiles.pstatic.net` 0건(projects.json), 카피 내 `→`, `⇒`, `—`, `↔` 0건(projects.json)
- 미리보기(실제 콘텐츠): 390px에서 /project의 첫 프로젝트가 첫 화면 안에 들어옴(통계 카드 숨김, 기술 필터 접힘)

### 3. 스크린샷

수정 후: `/`, `/project`, `/project/{pocaz,ticket-sim,daedo-law,react-devtool-cli,tour-record}`, `/tech-stack` (390, 1440).

### 4. 남은 TODO(user) (추가분)

| 위치 | TODO | 질문 |
|---|---|---|
| POCAZ | Elysia를 Next.js 라우트 안에 둔 이유 | 별도 서버 대신 Next.js 안에 Elysia를 둔 판단 이유가 무엇이었나요? (구조와 트레이드오프는 저장소 기준으로 적었습니다) |
| POCAZ | 채팅 화면 캡처 | 로그인이 필요해 자동 캡처를 못 했습니다. 채팅 화면 캡처를 주실 수 있나요? |
| Travel Records | 운영 지표 | 새 여행 하나를 추가하는 데 걸리는 시간 같은 운영 지표가 있나요? |
| 법률사무소 대도 | 이전 문제 | 사이트를 만들기 전 사무소는 콘텐츠를 어떻게 수정했나요? |
| 법률사무소 대도 | 역할 | 2인 팀에서 맡은 범위가 프론트엔드만인가요, DB 설계와 RLS까지인가요? |
| 법률사무소 대도 | 고객 커뮤니케이션 | 고객과 요구사항을 어떻게 주고받았나요? |
| 법률사무소 대도 | 공개일, 유지보수 | 2023.05 공개가 맞나요? 지금도 유지보수를 하나요? |
| 법률사무소 대도 | 관리자 화면 범위 | 관리자 화면에서 무엇을 수정할 수 있나요? (공개 사이트에서는 확인할 수 없음) |
| 프론트엔드 주니어 스터디 | 기간 | 2025.11 - 2026.01이 맞나요? 저장소 마지막 커밋은 2026.04입니다. |
| 메뉴 고르기 | 기능별 캡처 | 첫 화면 외에는 입력이 필요해 캡처하지 못했습니다. |

### 5. 보류한 항목

- 대도 갤러리의 현판 이미지에는 변호사 실명이 들어 있습니다. 기존 사이트에서 이미 쓰던 이미지라 옮기기만 했고, 빼야 하면 알려 주세요.
- 역대카 첫 화면 캡처에는 사이트의 견적/계약 건수가 보여서 갤러리에 넣지 않았습니다(친환경 차량 목록 캡처만 추가).
- `next.config.ts`의 `postfiles.pstatic.net` remotePatterns는 유지했습니다. 현재 운영 매니페스트가 아직 그 이미지를 쓰므로, portfolio-content 머지 후 지우면 됩니다.
- 메뉴 고르기의 "협업 필터링" 등 외부에서 확인할 수 없는 서술은 그대로 두고 한 줄 요약만 붙였습니다.

---

## Phase 4. UI / 접근성

### 1. 변경 파일과 요약

| 우선 | 문제 | 처리 |
|---|---|---|
| High | 라이트박스가 섹션 안에 갇힘, 캡션이 이미지 가림, role 없음, 열 때 헤더 밀림 | `src/shared/ui/image-gallery.tsx`를 네이티브 `<dialog>` + `showModal()`로 바꿈(top layer라 조상 transform 영향 없음, 전체 화면, ESC 닫기, 닫으면 트리거로 포커스 복귀, 나머지 페이지 inert). 이미지는 `object-contain`, 캡션은 이미지 아래 별도 줄, 닫기 버튼은 상단 바. `html { scrollbar-gutter: stable }`. 출처 링크(`source`) 표시 |
| High | `/tech-stack` 모바일 가로 스크롤 | Phase 1에서 magic-move 위젯 제거로 해소, 그리드 자식 `min-w-0`, `html { overflow-x: clip }`, 검증 명령 코드 블록 `max-w-full overflow-x-auto` |
| High | 모바일 메뉴 패널 반투명, 제목 "메뉴 열기" | 패널 `bg-background` 불투명, 뒤에 `bg-black/55` 오버레이, 패널 제목과 nav 이름 "메뉴"(토글 버튼 이름은 "메뉴 열기" 유지), 모바일 메뉴에 GitHub/LinkedIn 링크 |
| High | 히어로 ASCII가 본문·입력창 위로 지나감 | 데스크탑에서 캔버스를 오른쪽 36% 열로 제한(본문은 왼쪽), 모바일은 애니메이션 없이 낮은 투명도 배경. 기존 `prefers-reduced-motion` 처리(한 번만 그림) 유지. 모바일 판정을 캔버스 폭이 아니라 viewport 폭으로 |
| High | 모바일에서 첫 프로젝트가 1.4화면 아래 | Phase 3에서 통계 카드 숨김, 기술 필터 접힘. 홈 히어로는 모바일에서 화면 높이 고정을 풀어 대표 작업이 바로 이어짐 |
| Med | 한국어 단어 중간 줄바꿈 | `body { word-break: keep-all; overflow-wrap: anywhere }`, 제목 `text-wrap: balance` |
| Med | 채팅 버튼이 본문/CTA 가림 | 푸터 하단 여백(모바일 `pb-24`). 스크롤 중 축소/숨김은 하지 않음 |
| Med | 입력창 14px | 히어로 입력, 채팅 textarea, /fit textarea를 모바일 16px |
| Med | 터치 영역 작음 | 헤더/푸터 아이콘 44px, 히어로 칩·링크, 필터 버튼, 카드 링크, 채팅 닫기/추천 질문 `min-h-11` |
| Med | "일하는 방식" 큰 제목 2개 | Phase 2에서 제목 하나로 |
| Med | 현재 페이지 표시 없음 | 헤더 링크 활성 스타일 + `aria-current="page"` |
| Med | 아이콘 링크 이름 없음 | GitHub/LinkedIn `aria-label` |
| Low | title 이름 중복 | `buildPageMetadata`가 `title.absolute` 사용 |
| Low | skip link 없음, 로고가 h2 | "본문으로 건너뛰기" 링크와 `#main-content`, 로고 텍스트는 span, 로고 이미지는 장식(alt="") |
| Low | /about 이미지 alt, 모바일에서 큼 | alt "Ring-wdr GitHub 프로필 이미지", 모바일에서 숨기고 sm 이상에서 작게 |
| Low | 목록 둘째 줄이 불릿 아래로 | `list-disc pl-5`(outside), 글리프 불릿 제거 |
| Low | 모바일 채팅 패널 여백 | 기존 `right-4` + `100vw-2rem` 폭으로 좌우 16px 같음(390px 캡처로 확인). 변경 없음 |
| Low | 10.88px 아이브로 | 12px(`text-xs`)로 |
| Low | 테마 토글이 푸터에만, 히어로 항상 검정 | 헤더에 테마 토글, 히어로 배경/글자를 `--hero-bg`/`--hero-fg` 토큰으로 바꿔 라이트에서는 밝게 |
| Low | 채팅 버튼 색 불일치, 영어 라벨 | 채팅 버튼은 두 테마 같은 `--brand` 색. 한국어에서 "Live Demo"를 "라이브 사이트", "Role Fit"을 "JD 매칭"으로 |
| Low | apple-touch-icon 8개 | 180×180 하나 |

### 2. 검증

- `pnpm lint && pnpm test -- --run && pnpm build`: 통과 (0 errors, 기존 경고 1건, 테스트 63개)
- Playwright 전체(로컬 Chromium): 20개 통과
- 새 `tests/layout-a11y.spec.ts`(CI E2E 단계에 추가):
  - 390×844, 1440×900에서 `/`, `/project`, 모든 상세, `/about`, `/tech-stack`, `/fit`, `/contact`의 `scrollWidth - clientWidth <= 0`
  - 라이트박스 bounding box가 viewport 전체(0, 0, 폭, 높이), ESC로 닫히고 트리거로 포커스 복귀 (390, 1440)
  - 헤더의 모든 링크/버튼이 접근 가능한 이름 보유, 데스크탑에서 `aria-current="page"` 1개
  - 모든 라우트 title에 "Manjoong Kim"이 정확히 1번
  - 390px에서 `/`(채팅 열기 포함), `/contact`, `/fit`의 입력 요소 font-size >= 16px

### 3. 스크린샷

수정 후: 홈 라이트/다크(1440), 홈·메뉴 열림·라이트박스·채팅 열림·상세(390), 라이트박스·갤러리(1440), /tech-stack(390). 수정 전은 라이브 사이트 캡처.

### 4. 남은 TODO(user)

Phase 4에서 새로 생긴 TODO는 없습니다.

### 5. 보류한 항목

- 채팅 버튼을 스크롤 중 숨기거나 줄이는 동작은 넣지 않고 하단 여백만 확보했습니다.
- `next dev`가 `AGENTS.md`의 pnpm 규칙 줄을 지우는 문제(Phase 2 참고)는 그대로입니다.

---

## 전체 TODO(user) 목록과 질문

모두 portfolio-content `projects.json`의 `todo` 필드(렌더링 안 함)나 이 문서에만 있고, 사이트에 노출되는 문구에는 없습니다(검증 스크립트와 단위 테스트가 막음).

### 작성자 답변으로 반영한 것

| 질문 | 답변 | 반영 |
|---|---|---|
| 역대카 성격, 역할 | 지인을 돕는 개인 참여, 웹 기술 전반 | 팀 "지인의 서비스를 돕는 개인 참여", 역할 "웹 개발 전반", 요약 박스 "내가 한 일" 추가. 카테고리는 Product 유지 |
| 대도 역할, 이전 문제 | 풀스택. 그전까지 웹 페이지 운영이 없었음 | 역할 "풀스택 개발", 요약 박스 "어떤 문제였나", "내가 한 일" 추가, 배경 문단에 반영 |
| POCAZ 원 팀, 리메이크 범위, Elysia 이유 | 6명 팀, 리메이크는 재현에 초점, 비용 문제(Vercel Hobby 플랜) | 팀 "6명 팀 프로젝트를 혼자 다시 구현한 리메이크", 요약 박스 문제·한 일, 첫 챌린지(별도 API 서버 비용 없이 Hobby 플랜 안에서 함께 배포) |
| XMORSE 이미지 | 허락 못 받음 | 이미지를 넣지 않음. 갤러리는 비워 두고 섹션도 렌더링되지 않음 |
| 영문 회사명 | SUGARBRICKS, sysware | 영어 /about 소개와 경력, 챗봇 지식에 받은 표기 그대로 |

### 두 번째 답변으로 반영한 것

| 질문 | 답변 | 반영 |
|---|---|---|
| 역대카 기간, 챌린지 | 맞음 | 기간 2024.06 - 2024.08과 챌린지/해결책 유지, TODO 삭제 |
| 법률사무소 대도 남은 질문 | 오래되어 기억나지 않음 | 확인되지 않은 공개일(2023.05)을 결과 문장에서 빼고 "daedolaw.com이 2026.10 현재 운영 중"만 남김. 페이지 수, 커뮤니케이션 방식은 쓰지 않음. 관리자 페이지 기능은 기존 서술 유지. TODO 종료 |
| XMORSE 운영 상태 | 재직 중 계약 상태였고 회사 홈페이지에 제품 페이지가 남아 있어 운영 중으로 추정 | 카드 "운영 중" 유지, TODO 삭제 |
| 프론트엔드 주니어 스터디 기간 | 마지막 커밋 2026.04로 | 기간 2025.11 - 2026.04 |
| 메뉴 고르기 지원 범위 | 커피빈만 지원 | 여러 브랜드를 전제로 한 서술(브랜드별 크롤링, 브랜드 필터, 브랜드·메뉴 분리 스키마)을 커피빈 기준으로 고치고 "지원 카페: 커피빈 1곳" 지표 추가 |
| 메뉴 고르기 기능 | 협업 필터링 없음. 이전에 고른 메뉴를 DB에 보관, Fluid Compute가 없던 때라 크롤링이 오래 걸려 관리자 화면에서 수동 실행, 메뉴 검색·카테고리 필터 있음 | 추천 관련 서술(협업 필터링, 추천 알고리즘) 삭제. 기능·챌린지·해결책을 위 내용으로 다시 씀. 캡션을 기존 스크린샷에 보이는 화면(검색, 카테고리 필터, 선택 메뉴, 청구서)에 맞춤 |
| 역대카 견적/계약 기여 | 개발만 했고 계약 기여는 알 수 없음 | 건수와 기여는 쓰지 않음, TODO 종료 |
| Travel Records 운영 지표 | 기술적 동기화는 Opus 5.5가 해서 오래 걸리지 않지만, 메타데이터로 알 수 없는 여행 맥락은 직접 채워야 해서 측정할 수치가 없음 | 수치는 쓰지 않음. "배운 점 / 다음 단계"에 사실 한 줄(동기화는 Opus 5.5, 여행 맥락은 직접 작성) 추가, TODO 종료 |

### 남은 질문

없음. POCAZ 채팅 캡처와 이력서 PDF는 넘어가기로 했습니다. 채팅 캡처 없이 갤러리는 3장(메인, 마켓, 커뮤니티)이고, 이력서 버튼은 `public/resume.pdf`가 없으므로 렌더링되지 않습니다. 나중에 PDF를 넣고 다시 배포하면 헤더와 /contact에 버튼이 나타납니다. `projects.json`의 `todo`는 모두 비웠습니다.

## 머지와 배포 순서

1. next-portfolio `portfolio-fix/persona-review`를 먼저 머지·배포 (새 스키마 필드는 모두 선택값이라 지금 운영 매니페스트도 그대로 읽음)
2. 그다음 portfolio-content `portfolio-fix/persona-review`를 main에 머지 (머지 시 Blob publish와 revalidate가 실행됨). 순서가 바뀌면 옛 사이트가 `Work` 카테고리를 읽지 못해 마지막 정상 페이지를 계속 보여 줍니다
3. 콘텐츠 머지 후 `next.config.ts`의 `postfiles.pstatic.net` remotePatterns 제거 가능
