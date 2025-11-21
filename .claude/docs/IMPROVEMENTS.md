# 포트폴리오 개선 제안 목록

> 현재 프로젝트에 추가할 수 있는 기능 및 개선사항 목록
>
> **작성일**: 2025-11-20
> **프로젝트**: Next.js 16 포트폴리오
> **버전**: 0.1.01

---

## 📋 목차

- [우선순위 개요](#우선순위-개요)
- [High Priority (즉시 추가 권장)](#high-priority-즉시-추가-권장)
- [Medium Priority (중기적 추가)](#medium-priority-중기적-추가)
- [Low Priority (장기적 고려)](#low-priority-장기적-고려)
- [구현 상태 추적](#구현-상태-추적)

---

## 우선순위 개요

### 우선순위 기준

- **High**: 포트폴리오 완성도에 즉각적인 영향, 구현 난이도 중하
- **Medium**: 사용자 경험 개선 및 기술 역량 어필, 구현 시간 필요
- **Low**: 추가 기능, 장기적 관점에서 도움

### 현재 프로젝트 상태

- ✅ 기본 페이지 구조 (Home, About, Projects, Tech Stack, Contact)
- ✅ 다크/라이트 모드
- ✅ 이메일 문의 기능
- ✅ 반응형 디자인
- ✅ E2E & Unit 테스트 설정

---

## High Priority (즉시 추가 권장)

### 1. 프로젝트 상세 페이지 ⭐⭐⭐

**현재 문제점**:

- 프로젝트 목록만 있고 외부 링크만 제공
- 프로젝트 경험을 깊이있게 전달하기 어려움

**제안 내용**:

```
/project/[slug] 동적 라우트 생성
각 프로젝트별 상세 페이지 구현
```

**포함될 내용**:

- 프로젝트 배경 및 목표
- 기술적 챌린지와 해결 방법
- 스크린샷 갤러리 (Image Gallery)
- 팀 구성 및 본인 역할
- 주요 기능 설명
- 성과 지표 (사용자 수, 성능 개선 등)
- GitHub 링크, 라이브 데모 링크
- 관련 기술 스택 태그

**기술 스택**:

- Next.js Dynamic Routes
- next/image (이미지 최적화)
- MDX (옵션: 마크다운 형식 지원)

**예상 작업 시간**: 4-6시간

**우선순위 이유**:

- 포트폴리오의 핵심은 프로젝트 경험
- 채용 담당자가 가장 관심있는 부분
- 구현 난이도 중하

**관련 파일**:

- `src/app/project/[slug]/page.tsx` (신규)
- `src/pages-layer/project/[slug]/index.tsx` (신규)
- `src/shared/constant/project.tsx` (수정)

---

### 2. 이력서/경력 타임라인 ⭐⭐⭐

**현재 문제점**:

- About 페이지가 간단한 소개만 있음
- 경력 및 교육 이력 정보 부족

**제안 내용**:

```
시간순으로 정렬된 경력 타임라인 UI
각 경력별 상세 정보 표시
```

**포함될 내용**:

- 경력 타임라인 (회사, 직책, 기간)
- 각 경력별 주요 업무 및 성과
- 교육 이력 (학교, 전공, 학위)
- 자격증 및 수료증
- PDF 이력서 다운로드 버튼
- 인쇄 최적화 스타일

**기술 스택**:

- React 컴포넌트 (Timeline UI)
- CSS Grid/Flexbox (레이아웃)
- react-to-pdf 또는 브라우저 print API

**예상 작업 시간**: 3-4시간

**우선순위 이유**:

- 전문성 강화
- 채용 과정에서 필수 정보
- 재사용 가능한 컴포넌트

**관련 파일**:

- `src/pages-layer/about/index.tsx` (수정)
- `src/shared/constant/career.tsx` (신규)
- `src/shared/ui/timeline.tsx` (신규)

---

### 3. Skills 시각화 및 숙련도 표시 ⭐⭐⭐

**현재 문제점**:

- Tech Stack 페이지에 단순 나열만 있음
- 숙련도나 경험 수준을 알 수 없음

**제안 내용**:

```
기술별 숙련도를 시각화
카테고리별 그룹핑 강화
관련 프로젝트 연결
```

**포함될 내용**:

- 각 기술별 숙련도 표시 (Beginner/Intermediate/Advanced)
- 사용 경험 기간 (예: 3년)
- 레이더 차트 또는 바 차트로 시각화
- 관련 프로젝트 링크
- 학습 중인 기술 별도 표시
- 주요 기술 / 보조 기술 구분

**기술 스택**:

- Recharts 또는 Chart.js (데이터 시각화)
- Radix UI Progress (프로그레스 바)
- Framer Motion (애니메이션)

**예상 작업 시간**: 4-5시간

**우선순위 이유**:

- 기술 역량을 명확하게 전달
- 시각적으로 임팩트 있음
- 차별화 포인트

**관련 파일**:

- `src/pages-layer/tech-stack/index.tsx` (대폭 수정)
- `src/shared/constant/tech-stack.tsx` (수정: 숙련도 추가)
- `src/shared/ui/skill-chart.tsx` (신규)

---

## Medium Priority (중기적 추가)

### 4. 블로그/글쓰기 섹션 ⭐⭐

**제안 내용**:

```
/blog 라우트 생성
MDX 기반 블로그 시스템
```

**포함될 내용**:

- 기술 블로그 포스팅
- 학습 내용 정리
- 문제 해결 과정 공유
- 태그/카테고리 필터링
- 검색 기능
- 조회수 카운터 (옵션)
- 댓글 시스템 (giscus 등)

**기술 스택**:

- next-mdx-remote 또는 contentlayer
- gray-matter (frontmatter 파싱)
- rehype-pretty-code (코드 하이라이팅)
- Supabase (조회수 저장, 옵션)

**예상 작업 시간**: 8-10시간

**우선순위 이유**:

- 지속적인 학습 의지 표현
- SEO 향상
- 콘텐츠 자산 축적

**관련 파일**:

- `src/app/blog/page.tsx` (신규)
- `src/app/blog/[slug]/page.tsx` (신규)
- `content/blog/*.mdx` (신규 디렉토리)
- `src/lib/mdx.ts` (신규)

---

### 5. 애니메이션 & 인터랙션 강화 ⭐⭐

**현재 문제점**:

- 기본 CSS 애니메이션만 사용
- 페이지 전환이 단조로움

**제안 내용**:

```
Framer Motion으로 마이크로 인터랙션 추가
스크롤 기반 애니메이션
```

**포함될 내용**:

- 페이지 전환 애니메이션
- 스크롤 애니메이션 (fade-in, slide-up)
- 호버 효과 강화
- 로딩 스켈레톤 UI
- 버튼 클릭 피드백
- 카드 뒤집기 효과

**기술 스택**:

- Motion
- Intersection Observer API
- CSS transforms & transitions

**예상 작업 시간**: 5-6시간

**우선순위 이유**:

- 사용자 경험 개선
- 프론트엔드 역량 어필
- 현대적인 웹 트렌드

**관련 파일**:

- 모든 페이지 컴포넌트 (점진적 적용)
- `src/shared/ui/animated-*.tsx` (신규)
- `src/app/template.tsx` (신규: 페이지 전환)

---

### 6. 프로젝트 필터링 & 검색 ⭐⭐

**제안 내용**:

```
Project 페이지에 필터/검색 기능 추가
```

**포함될 내용**:

- 기술 스택별 필터 (다중 선택)
- 프로젝트 유형별 (개인/팀/회사)
- 날짜순 정렬 (최신순/오래된순)
- 검색 기능 (제목, 설명)
- 필터 상태 URL 쿼리스트링 동기화
- 필터 리셋 버튼

**기술 스택**:

- React State (useState)
- URL Search Params (Next.js useSearchParams)
- Radix UI Select/Checkbox

**예상 작업 시간**: 3-4시간

**우선순위 이유**:

- 프로젝트가 많아지면 필수
- 사용자 편의성
- 상태 관리 능력 어필

**관련 파일**:

- `src/pages-layer/project/index.tsx` (수정)
- `src/shared/ui/project-filter.tsx` (신규)

---

### 7. 다국어 지원 (i18n) ⭐⭐

**제안 내용**:

```
한국어/영어 전환 기능
```

**포함될 내용**:

- next-intl 설정
- 언어 전환 토글 (Header)
- URL 기반 로케일 (`/en`, `/ko`)
- 모든 정적 텍스트 번역
- 날짜 포맷 로케일 적용
- 프로젝트 설명 다국어 지원

**기술 스택**:

- next-intl
- JSON 번역 파일

**예상 작업 시간**: 6-8시간

**우선순위 이유**:

- 글로벌 취업 대비
- 국제화 경험 어필
- 해외 채용 담당자 접근성

**관련 파일**:

- `src/i18n/*.json` (신규)
- `src/proxy.ts` (수정)
- 모든 컴포넌트 (점진적 적용)

---

## Low Priority (장기적 고려)

### 8. 방문자 통계/Analytics 대시보드 ⭐

**제안 내용**:

```
간단한 통계 페이지
```

**포함될 내용**:

- 페이지뷰, 방문자 수
- 인기 프로젝트 순위
- 방문자 위치 (국가별)
- 시간대별 방문 통계
- 유입 경로 분석

**기술 스택**:

- Vercel Analytics API
- Recharts (데이터 시각화)
- Supabase (커스텀 이벤트 트래킹)

**예상 작업 시간**: 8-10시간

**관련 파일**:

- `src/app/analytics/page.tsx` (신규)

---

### 9. 테마 커스터마이징 ⭐

**제안 내용**:

```
다크/라이트 외 추가 테마 옵션
```

**포함될 내용**:

- 컬러 테마 선택 (블루, 그린, 퍼플 등)
- 폰트 크기 조절
- 애니메이션 속도 조절
- 접근성 모드 (고대비, 모션 감소)

**기술 스택**:

- CSS Variables
- localStorage (설정 저장)

**예상 작업 시간**: 4-5시간

**관련 파일**:

- `src/app/_provider/theme.tsx` (수정)
- `src/shared/ui/theme-customizer.tsx` (신규)

---

### 10. 소셜 링크 & 공유 기능 ⭐

**제안 내용**:

```
소셜 미디어 통합
```

**포함될 내용**:

- GitHub, LinkedIn, Twitter 링크
- 프로젝트 공유 버튼
- Open Graph 메타태그 최적화
- sitemap.xml 생성
- robots.txt 설정
- RSS 피드 (블로그 구현 후)

**기술 스택**:

- Next.js Metadata API
- next-sitemap

**예상 작업 시간**: 2-3시간

**관련 파일**:

- `src/app/layout.tsx` (메타태그)
- `next-sitemap.config.js` (신규)
- `src/shared/ui/social-share.tsx` (신규)

---

### 11. 추천사/피드백 섹션 ⭐

**제안 내용**:

```
협업자 추천사 표시
```

**포함될 내용**:

- 팀원/클라이언트 추천
- 별점/코멘트
- 추천인 프로필
- 추천사 캐러셀

**기술 스택**:

- Swiper 또는 embla-carousel
- Supabase (추천사 저장, 옵션)

**예상 작업 시간**: 3-4시간

**관련 파일**:

- `src/pages-layer/about/index.tsx` (추가)
- `src/shared/constant/testimonials.tsx` (신규)

---

### 12. 코드 스니펫 쇼케이스 ⭐

**제안 내용**:

```
자랑할 만한 코드 조각 전시
```

**포함될 내용**:

- 코드 스니펫 갤러리
- Syntax highlighting
- 코드 설명 및 컨텍스트
- CodeSandbox/StackBlitz 임베드
- 복사 버튼

**기술 스택**:

- Shiki 또는 Prism (코드 하이라이팅)
- react-code-blocks

**예상 작업 시간**: 4-5시간

**관련 파일**:

- `src/app/snippets/page.tsx` (신규)
- `src/shared/constant/snippets.tsx` (신규)

---

## 구현 상태 추적

### 진행 현황

| 기능                 | 우선순위 | 상태      | 시작일     | 완료일     | 담당 세션    | 비고                                    |
| -------------------- | -------- | --------- | ---------- | ---------- | ------------ | --------------------------------------- |
| 프로젝트 상세 페이지 | High     | 🟢 완료   | 2025-11-21 | 2025-11-21 | Session #1   | 모달/페이지 듀얼뷰, 갤러리, 다국어 지원 |
| 이력서/경력 타임라인 | High     | 🔴 미시작 | -          | -          | -            | -                                       |
| Skills 시각화        | High     | 🔴 미시작 | -          | -          | -            | -                                       |
| 블로그 섹션          | Medium   | 🔴 미시작 | -          | -          | -            | -                                       |
| 애니메이션 강화      | Medium   | 🔴 미시작 | -          | -          | -            | -                                       |
| 프로젝트 필터링      | Medium   | 🔴 미시작 | -          | -          | -            | -                                       |
| 다국어 지원          | Medium   | 🟢 완료   | 2025-11-20 | 2025-11-21 | Pre-existing | next-intl 4.5.5, KO/EN 전체 번역        |
| 방문자 통계          | Low      | 🔴 미시작 | -          | -          | -            | -                                       |
| 테마 커스터마이징    | Low      | 🔴 미시작 | -          | -          | -            | -                                       |
| 소셜 링크            | Low      | 🔴 미시작 | -          | -          | -            | -                                       |
| 추천사 섹션          | Low      | 🔴 미시작 | -          | -          | -            | -                                       |
| 코드 스니펫          | Low      | 🔴 미시작 | -          | -          | -            | -                                       |

### 상태 범례

- 🔴 미시작: 작업 시작 전
- 🟡 진행중: 현재 작업 중
- 🟢 완료: 구현 및 테스트 완료
- ⚫ 보류: 일시적으로 중단

---

## 다음 단계

1. **구현 우선순위 결정**: High Priority 3개 중 선택
2. **상세 스펙 문서 확인**: `.claude/docs/features/` 디렉토리 참고
3. **구현 시작**: `/implement` 명령어로 기능 구현
4. **진행 상황 업데이트**: 이 문서의 "구현 상태 추적" 테이블 갱신

---

## 참고 문서

- [구현 로드맵](./ROADMAP.md)
- [기능별 상세 스펙](./features/)
- [기술 스택 가이드](./TECH_STACK.md)

---

**최종 수정일**: 2025-11-20
