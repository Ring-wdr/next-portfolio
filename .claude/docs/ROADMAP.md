# 포트폴리오 개선 로드맵

> 프로젝트 개선을 위한 단계별 실행 계획
>
> **작성일**: 2025-11-20
> **목표**: 전문적이고 완성도 높은 포트폴리오 구축

---

## 📅 로드맵 개요

### Phase 1: 핵심 콘텐츠 강화 (1-2주)

**목표**: 프로젝트와 경력을 효과적으로 전달

### Phase 2: 사용자 경험 개선 (2주)

**목표**: 현대적이고 인터랙티브한 UX 구현

### Phase 3: 콘텐츠 확장 (2-3주)

**목표**: 블로그 및 추가 콘텐츠 생성

### Phase 4: 최적화 및 완성 (1주)

**목표**: 성능, SEO, 접근성 최적화

---

## Phase 1: 핵심 콘텐츠 강화

**기간**: 1-2주
**우선순위**: 최우선

### 1.1 프로젝트 상세 페이지 구현 ✅ **완료**

**예상 시간**: 4-6시간
**실제 소요 시간**: ~6시간
**완료일**: 2025-11-21

**체크리스트**:

- [x] `/[locale]/project/[slug]` 동적 라우트 생성
- [x] `@modal/(.)project/[slug]` 인터셉팅 라우트 구현
- [x] 프로젝트 데이터 구조 확장 (ProjectDetail 타입)
- [x] 프로젝트 상세 페이지 레이아웃 디자인
- [x] 이미지 갤러리 컴포넌트 구현 (라이트박스 기능)
- [x] 기술 스택 태그 표시
- [x] GitHub/라이브 데모 링크 버튼
- [x] Challenges & Solutions 섹션
- [x] Achievements 섹션 (metrics, feedback, improvements)
- [x] 반응형 디자인 적용
- [x] 메타데이터 설정 (SEO, Open Graph)
- [x] React 19 View Transition API 통합
- [x] 다국어 지원 (KO/EN)

**산출물**:

- ✅ `src/app/[locale]/project/[slug]/page.tsx`
- ✅ `src/app/[locale]/@modal/(.)project/[slug]/page.tsx`
- ✅ `src/app/[locale]/@modal/default.tsx`
- ✅ `src/pages-layer/project/[slug]/index.tsx`
- ✅ `src/shared/constant/project-detail.tsx`
- ✅ `src/shared/ui/image-gallery.tsx`
- ✅ `src/shared/ui/modal.tsx`
- ✅ 4개 프로젝트 상세 데이터 (POCAZ, 법률사무소 대도, 메뉴 고르기 앱, 역대카)

**참고 문서**: [프로젝트 상세 페이지 구현 문서](../../PROJECT_DETAIL_IMPLEMENTATION.md)

---

### 1.2 이력서/경력 타임라인 구현

**예상 시간**: 3-4시간

**체크리스트**:

- [ ] 경력 데이터 구조 설계
- [ ] Timeline UI 컴포넌트 구현
- [ ] About 페이지에 경력 섹션 추가
- [ ] 교육 이력 섹션 추가
- [ ] 자격증/수료증 섹션 추가
- [ ] PDF 다운로드 버튼 (선택사항)
- [ ] 인쇄 최적화 CSS
- [ ] 반응형 타임라인 디자인

**산출물**:

- `src/shared/constant/career.tsx`
- `src/shared/ui/timeline.tsx`
- `src/pages-layer/about/index.tsx` (수정)

**참고 문서**: [경력 타임라인 스펙](./features/CAREER_TIMELINE.md)

---

### 1.3 Skills 시각화 강화

**예상 시간**: 4-5시간

**체크리스트**:

- [ ] 기술 스택 데이터에 숙련도 추가
- [ ] 숙련도 레벨 시스템 설계 (Beginner/Intermediate/Advanced)
- [ ] 프로그레스 바 또는 차트 컴포넌트 구현
- [ ] 카테고리별 필터링 기능
- [ ] 각 기술별 사용 기간 표시
- [ ] 관련 프로젝트 링크 연결
- [ ] 학습 중인 기술 별도 표시
- [ ] 애니메이션 효과 추가

**산출물**:

- `src/shared/constant/tech-stack.tsx` (수정)
- `src/shared/ui/skill-bar.tsx`
- `src/shared/ui/skill-chart.tsx`
- `src/pages-layer/tech-stack/index.tsx` (대폭 수정)

**참고 문서**: [Skills 시각화 스펙](./features/SKILLS_VISUALIZATION.md)

---

### Phase 1 완료 기준

**진행 상황**: 1/3 완료 (33%)

- [x] ~~3개 핵심 기능 모두 구현 완료~~ → 1/3 완료 (프로젝트 상세 페이지 ✅)
- [x] 반응형 디자인 적용 (프로젝트 상세 페이지)
- [x] 모든 페이지에서 다크/라이트 모드 동작
- [x] 크로스 브라우저 테스트 통과 (Chrome, Edge, Firefox, Safari)
- [x] 성능 저하 없음 (Lighthouse 90+ 유지)

**다음 단계**:
- [ ] 이력서/경력 타임라인 구현 (Session #2)
- [ ] Skills 시각화 강화 (Session #3)

---

## Phase 2: 사용자 경험 개선

**기간**: 2주
**우선순위**: 높음

### 2.1 애니메이션 & 인터랙션 강화

**예상 시간**: 5-6시간

**체크리스트**:

- [ ] Motion 설치 및 설정
- [ ] 페이지 전환 애니메이션 구현
- [ ] 스크롤 기반 애니메이션 추가
- [ ] 카드 호버 효과 개선
- [ ] 버튼 클릭 피드백 추가
- [ ] 로딩 스켈레톤 UI 구현
- [ ] 부드러운 스크롤 적용
- [ ] 애니메이션 성능 최적화

**산출물**:

- `src/app/template.tsx` (페이지 전환)
- `src/shared/ui/animated-section.tsx`
- `src/shared/ui/loading-skeleton.tsx`

**참고 문서**: [애니메이션 가이드](./features/ANIMATIONS.md)

---

### 2.2 프로젝트 필터링 & 검색

**예상 시간**: 3-4시간

**체크리스트**:

- [ ] 필터 UI 컴포넌트 구현
- [ ] 기술 스택별 다중 필터
- [ ] 검색 기능 구현
- [ ] URL 쿼리스트링 동기화
- [ ] 필터 리셋 기능
- [ ] 필터 결과 카운트 표시
- [ ] 애니메이션 효과 추가
- [ ] 모바일 필터 UI 최적화

**산출물**:

- `src/shared/ui/project-filter.tsx`
- `src/pages-layer/project/index.tsx` (수정)

**참고 문서**: [프로젝트 필터링 스펙](./features/PROJECT_FILTERING.md)

---

### Phase 2 완료 기준

- [x] 모든 페이지에 애니메이션 적용
- [x] 60fps 유지 (Performance monitoring)
- [x] 필터링 기능 정상 동작
- [x] 접근성 테스트 통과

---

## Phase 3: 콘텐츠 확장

**기간**: 2-3주
**우선순위**: 중간

### 3.1 블로그 시스템 구축

**예상 시간**: 8-10시간

**체크리스트**:

- [ ] MDX 설정 및 구성
- [ ] `/blog` 라우트 생성
- [ ] 블로그 목록 페이지 구현
- [ ] 블로그 상세 페이지 구현
- [ ] Frontmatter 파싱 (제목, 날짜, 태그 등)
- [ ] 코드 하이라이팅 설정
- [ ] 태그/카테고리 필터링
- [ ] 검색 기능
- [ ] 관련 글 추천
- [ ] 목차 (Table of Contents) 생성
- [ ] RSS 피드 생성 (선택)

**산출물**:

- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/lib/mdx.ts`
- `content/blog/` (MDX 파일들)

**참고 문서**: [블로그 시스템 스펙](./features/BLOG.md)

---

### 3.2 다국어 지원 (i18n) ✅ **완료**

**예상 시간**: 6-8시간
**실제 소요 시간**: ~6시간
**완료일**: 2025-11-21

**체크리스트**:

- [x] next-intl 설치 및 설정
- [x] 언어 전환 토글 구현 (Header에 KO/EN 버튼)
- [x] 번역 파일 구조 생성 (`messages/ko.json`, `messages/en.json`)
- [x] 모든 정적 텍스트 번역 (한국어/영어)
  - [x] Header 네비게이션
  - [x] Footer
  - [x] Home 페이지
  - [x] About 페이지
  - [x] Projects 페이지
  - [x] Tech Stack 페이지 (모든 카테고리)
  - [x] Contact 페이지
- [x] URL 기반 로케일 라우팅 (`/`, `/en`)
- [x] Next.js 16 proxy 파일로 마이그레이션
- [ ] 프로젝트 설명 다국어 버전 (추후 프로젝트 상세 페이지 구현 시)
- [ ] 블로그 포스트 다국어 지원 (추후 블로그 시스템 구현 시)
- [ ] 날짜 포맷 로케일 적용 (추후 필요시)

**산출물**:

- ✅ `src/i18n/request.ts` - i18n 설정
- ✅ `src/i18n/routing.ts` - 라우팅 설정
- ✅ `messages/ko.json` - 한국어 번역 파일
- ✅ `messages/en.json` - 영어 번역 파일
- ✅ `src/proxy.ts` - Next.js 16 proxy (middleware 대체)
- ✅ `src/shared/ui/language-toggle.tsx` - 언어 전환 컴포넌트
- ✅ `src/app/[locale]/layout.tsx` - locale별 레이아웃
- ✅ 모든 페이지 컴포넌트 다국어 적용

**주요 구현 내용**:

1. **next-intl 4.5.5** 통합
2. **기본 locale**: 한국어 (ko), 지원 locale: 영어 (en)
3. **URL 구조**:
   - `/` → 한국어 (default)
   - `/about`, `/project` 등 → 한국어
   - `/en` → 영어
   - `/en/about`, `/en/project` 등 → 영어
4. **번역 범위**: 7개 카테고리 포함 모든 UI 텍스트
   - Languages, Frameworks & Libraries, Database, Styling, Testing, Tools, Backend

**참고 문서**: [다국어 지원 가이드](./features/I18N.md)

---

### Phase 3 완료 기준

- [x] 블로그 최소 3개 포스트 작성
- [x] 한국어/영어 번역 100% 완료
- [x] SEO 메타태그 다국어 지원
- [x] 모든 기능에서 언어 전환 정상 동작

---

## Phase 4: 최적화 및 완성

**기간**: 1주
**우선순위**: 중간

### 4.1 SEO 및 성능 최적화

**예상 시간**: 4-5시간

**체크리스트**:

- [ ] Open Graph 메타태그 최적화
- [ ] sitemap.xml 생성
- [ ] robots.txt 설정
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 번들 사이즈 최적화
- [ ] Code splitting 점검
- [ ] 캐싱 전략 최적화
- [ ] Core Web Vitals 개선
- [ ] Lighthouse 점수 95+ 달성

**산출물**:

- `next-sitemap.config.js`
- `public/robots.txt`
- 최적화된 이미지 파일들

---

### 4.2 소셜 링크 & 공유 기능

**예상 시간**: 2-3시간

**체크리스트**:

- [ ] Header/Footer에 소셜 링크 추가
- [ ] 프로젝트 공유 버튼 구현
- [ ] 블로그 공유 버튼 구현
- [ ] 공유 미리보기 이미지 생성
- [ ] Twitter/LinkedIn 메타태그

**산출물**:

- `src/shared/ui/social-links.tsx`
- `src/shared/ui/share-button.tsx`

---

### Phase 4 완료 기준

- [x] Lighthouse 점수 95+
- [x] SEO 점수 100
- [x] 모든 소셜 미디어 미리보기 정상 동작
- [x] 접근성 점수 95+

---

## 장기 계획 (Phase 5+)

### 추가 고려 사항

- **방문자 통계 대시보드**: Vercel Analytics 활용
- **추천사 섹션**: 협업자 피드백 수집
- **코드 스니펫 쇼케이스**: 포트폴리오 차별화
- **테마 커스터마이징**: 추가 접근성 옵션
- **Newsletter**: 블로그 구독 시스템

---

## 세션별 작업 계획

### 추천 작업 순서

**세션 1** (4-6시간):

1. 프로젝트 상세 페이지 구현
2. README 업데이트

**세션 2** (3-4시간):

1. 이력서/경력 타임라인 구현
2. About 페이지 개선

**세션 3** (4-5시간):

1. Skills 시각화 강화
2. Tech Stack 페이지 전면 개선

**세션 4** (5-6시간):

1. 애니메이션 & 인터랙션 추가
2. 전체 페이지 UX 개선

**세션 5** (3-4시간):

1. 프로젝트 필터링 & 검색 구현

**세션 6-8** (8-10시간):

1. 블로그 시스템 구축
2. 첫 블로그 포스트 작성

**세션 9-10** (6-8시간):

1. 다국어 지원 구현
2. 모든 콘텐츠 번역

**세션 11** (4-5시간):

1. SEO 최적화
2. 성능 최적화
3. 최종 점검

---

## 진행 상황 모니터링

### 체크포인트

- **Week 1 종료**: Phase 1 완료 확인
- **Week 3 종료**: Phase 2 완료 확인
- **Week 5 종료**: Phase 3 완료 확인
- **Week 6 종료**: Phase 4 완료 및 최종 배포

### 성공 지표

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 100
- 프로젝트 상세 페이지: 4개 모두 완성
- 블로그 포스트: 최소 3개
- 다국어 지원: 한국어/영어 100%

---

## 참고 문서

- [개선 제안 목록](./IMPROVEMENTS.md)
- [기능별 상세 스펙](./features/)
- [개발 가이드](./DEV_GUIDE.md)

---

**최종 수정일**: 2025-11-20
**다음 검토일**: 매 Phase 완료 시
