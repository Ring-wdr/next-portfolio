# 프로젝트 상세 페이지 구현 스펙

> `/project/[slug]` 동적 라우트 기반 프로젝트 상세 정보 페이지

**우선순위**: High
**예상 작업 시간**: 4-6시간
**담당 Phase**: Phase 1

---

## 목표

현재 프로젝트 목록만 있고 외부 링크로만 연결되는 문제를 해결하고, 각 프로젝트의 상세 정보를 체계적으로 보여주는 페이지를 구현합니다.

---

## 기능 요구사항

### 1. 동적 라우팅
- `/project/[slug]` 형식의 URL
- `generateStaticParams`로 빌드 타임에 정적 생성
- 존재하지 않는 slug는 404 처리

### 2. 프로젝트 정보 표시
- **헤더 섹션**
  - 프로젝트 제목
  - 프로젝트 기간
  - 한 줄 요약
  - 외부 링크 버튼 (GitHub, Live Demo)

- **메인 이미지**
  - 대표 썸네일 이미지
  - next/image 최적화 적용
  - 반응형 이미지 크기

- **프로젝트 개요**
  - 프로젝트 배경 및 목표
  - 주요 기능 목록
  - 팀 구성 및 본인 역할

- **기술적 내용**
  - 사용 기술 스택 (태그 형식)
  - 기술적 챌린지
  - 해결 방법 및 학습 내용

- **성과**
  - 주요 성과 지표
  - 사용자 피드백
  - 개선 사항

- **이미지 갤러리**
  - 스크린샷 여러 장
  - 클릭 시 확대 보기
  - 좌우 네비게이션

- **관련 프로젝트**
  - 유사한 기술 스택의 다른 프로젝트
  - 카드 형식으로 3개 표시

---

## 데이터 구조

### ProjectDetail 타입 정의

```typescript
type ProjectDetail = {
  slug: string; // URL 경로용
  title: string;
  thumbnail: string | StaticImageData;
  summary: string; // 한 줄 요약
  period: string; // "2023.03 - 2023.06"
  team: string; // "4인 팀 프로젝트"
  role: string; // "프론트엔드 개발"

  // 링크
  links: {
    github?: string;
    demo?: string;
    etc?: { label: string; url: string }[];
  };

  // 메인 콘텐츠
  overview: {
    background: string; // 프로젝트 배경
    goal: string; // 목표
    features: string[]; // 주요 기능 목록
  };

  // 기술적 내용
  tech: {
    stack: TechStackEnum[]; // 기술 스택
    challenges: { title: string; description: string }[]; // 챌린지
    solutions: { title: string; description: string }[]; // 해결책
  };

  // 성과
  achievements: {
    metrics?: { label: string; value: string }[]; // "사용자 수", "1000+"
    feedback?: string[]; // 피드백 목록
    improvements?: string[]; // 개선사항
  };

  // 갤러리
  gallery: {
    src: string | StaticImageData;
    alt: string;
    caption?: string;
  }[];

  // 메타데이터
  metadata: {
    publishedAt: string; // ISO 8601
    updatedAt?: string;
    tags: string[];
  };
};
```

---

## UI/UX 디자인

### 레이아웃 구조

```
┌─────────────────────────────────────┐
│  Header (제목, 기간, 링크 버튼)       │
├─────────────────────────────────────┤
│  대표 이미지 (16:9 비율)             │
├─────────────────────────────────────┤
│  프로젝트 개요                       │
│  - 배경 및 목표                      │
│  - 주요 기능                         │
│  - 팀 구성 및 역할                   │
├─────────────────────────────────────┤
│  기술 스택 (태그 형식)               │
├─────────────────────────────────────┤
│  기술적 챌린지 & 해결                │
│  - 챌린지 1                         │
│  - 해결책 1                         │
│  - 챌린지 2                         │
│  - 해결책 2                         │
├─────────────────────────────────────┤
│  성과                               │
│  - 주요 지표                        │
│  - 피드백                           │
├─────────────────────────────────────┤
│  스크린샷 갤러리                     │
├─────────────────────────────────────┤
│  관련 프로젝트 (3개 카드)            │
└─────────────────────────────────────┘
```

### 반응형 디자인

- **모바일 (< 768px)**
  - 1 컬럼 레이아웃
  - 버튼 full-width
  - 갤러리 1장씩 표시

- **태블릿 (768px - 1024px)**
  - 1 컬럼 레이아웃 유지
  - 이미지 크기 최적화
  - 갤러리 2장씩 표시

- **데스크톱 (> 1024px)**
  - 메인 컨텐츠 최대 1200px 제한
  - 여백 적절히 활용
  - 갤러리 3장씩 표시

---

## 구현 계획

### Step 1: 데이터 구조 확장 (30분)

**작업 내용**:
1. `src/shared/constant/project-detail.tsx` 생성
2. 기존 `project.tsx`에서 데이터 확장
3. 4개 프로젝트의 상세 정보 작성

**체크리스트**:
- [ ] ProjectDetail 타입 정의
- [ ] POCAZ 상세 정보 작성
- [ ] 법률사무소 대도 상세 정보 작성
- [ ] 메뉴 고르기 앱 상세 정보 작성
- [ ] 역대카 상세 정보 작성

---

### Step 2: 동적 라우트 생성 (1시간)

**작업 내용**:
1. `src/app/project/[slug]/page.tsx` 생성
2. `generateStaticParams` 구현
3. `generateMetadata` 구현 (SEO)

**코드 예시**:
```typescript
// src/app/project/[slug]/page.tsx
import { ProjectDetailPage } from "@/pages-layer/project/[slug]";
import { projectDetailList } from "@/shared/constant/project-detail";

export async function generateStaticParams() {
  return projectDetailList.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projectDetailList.find((p) => p.slug === params.slug);

  return {
    title: `${project?.title} - Manjoong Portfolio`,
    description: project?.summary,
    openGraph: {
      images: [project?.thumbnail],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectDetailPage slug={params.slug} />;
}
```

**체크리스트**:
- [ ] 동적 라우트 파일 생성
- [ ] generateStaticParams 구현
- [ ] generateMetadata 구현
- [ ] 404 처리 (notFound)

---

### Step 3: 페이지 레이아웃 구현 (2시간)

**작업 내용**:
1. `src/pages-layer/project/[slug]/index.tsx` 생성
2. 각 섹션별 컴포넌트 구현
3. 반응형 레이아웃 적용

**컴포넌트 구조**:
```
ProjectDetailPage
├── ProjectHeader (제목, 기간, 링크)
├── ProjectHero (대표 이미지)
├── ProjectOverview (개요)
├── ProjectTechStack (기술 스택)
├── ProjectChallenges (챌린지 & 해결)
├── ProjectAchievements (성과)
├── ProjectGallery (갤러리)
└── RelatedProjects (관련 프로젝트)
```

**체크리스트**:
- [ ] ProjectHeader 컴포넌트
- [ ] ProjectHero 컴포넌트
- [ ] ProjectOverview 컴포넌트
- [ ] ProjectTechStack 컴포넌트
- [ ] ProjectChallenges 컴포넌트
- [ ] ProjectAchievements 컴포넌트
- [ ] ProjectGallery 컴포넌트
- [ ] RelatedProjects 컴포넌트

---

### Step 4: 이미지 갤러리 구현 (1.5시간)

**작업 내용**:
1. `src/shared/ui/image-gallery.tsx` 생성
2. 클릭 시 확대 모달 구현
3. 좌우 네비게이션 버튼
4. 키보드 네비게이션 (← →)

**기능 요구사항**:
- [ ] 썸네일 그리드 레이아웃
- [ ] 클릭 시 전체 화면 모달
- [ ] 이전/다음 버튼
- [ ] ESC 키로 닫기
- [ ] 화살표 키로 이동
- [ ] 배경 클릭 시 닫기
- [ ] 이미지 로딩 상태 표시

---

### Step 5: 스타일링 및 최적화 (1시간)

**작업 내용**:
1. Tailwind CSS로 스타일링
2. 다크/라이트 모드 대응
3. 이미지 최적화 (next/image)
4. 로딩 상태 처리

**체크리스트**:
- [ ] 전체 스타일링 완료
- [ ] 다크 모드 색상 적용
- [ ] 이미지 lazy loading
- [ ] 스켈레톤 UI (옵션)

---

### Step 6: 프로젝트 목록 페이지 연동 (30분)

**작업 내용**:
1. `src/pages-layer/project/index.tsx` 수정
2. 프로젝트 카드 클릭 시 상세 페이지로 이동
3. 링크 대신 내부 라우팅 사용

**수정 사항**:
```typescript
// Before
<Link href={project.href}>

// After
<Link href={`/project/${project.slug}`}>
```

**체크리스트**:
- [ ] 기존 프로젝트 목록 수정
- [ ] 내부 링크로 변경
- [ ] 외부 링크는 별도 버튼으로 표시

---

## 테스트 체크리스트

### 기능 테스트
- [ ] 모든 프로젝트 상세 페이지 접근 가능
- [ ] 이미지 갤러리 정상 동작
- [ ] 외부 링크 정상 동작
- [ ] 404 페이지 정상 표시

### 반응형 테스트
- [ ] 모바일 (< 768px) 레이아웃
- [ ] 태블릿 (768px - 1024px) 레이아웃
- [ ] 데스크톱 (> 1024px) 레이아웃

### 접근성 테스트
- [ ] 키보드 네비게이션
- [ ] 스크린 리더 지원
- [ ] 대체 텍스트 (alt)
- [ ] ARIA 라벨

### 성능 테스트
- [ ] 이미지 로딩 최적화
- [ ] Lighthouse Performance 90+
- [ ] LCP < 2.5s

---

## 예상 결과물

### 생성될 파일
1. `src/app/project/[slug]/page.tsx`
2. `src/pages-layer/project/[slug]/index.tsx`
3. `src/shared/constant/project-detail.tsx`
4. `src/shared/ui/image-gallery.tsx`

### 수정될 파일
1. `src/pages-layer/project/index.tsx`
2. `src/shared/constant/project.tsx` (slug 추가)

---

## 참고 자료

- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

---

**작성일**: 2025-11-20
**상태**: 🔴 미시작
