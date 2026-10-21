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
