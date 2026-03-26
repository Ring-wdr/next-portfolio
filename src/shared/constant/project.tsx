import type { TechStackEnum } from "./tech-stack";
import type { StaticImageData } from "next/image";
import { projectDetailList, type ProjectDetail } from "./project-detail";

type ProjectCategory = "Product" | "Client" | "Study";
type ProjectStatus = "Live" | "Prototype" | "Archived";

export type ProjectProps = {
	src: string | StaticImageData;
	title: string;
	href: string;
	slug: string; // 상세 페이지 경로
	description?: string;
	techStack: TechStackEnum[];
	featured: boolean;
	category: ProjectCategory;
	year: number;
	role: string;
	impact: string;
	result: string;
	status: ProjectStatus;
};

type ProjectCardMeta = {
	category: ProjectCategory;
	featured: boolean;
	impact: string;
	result: string;
	status: ProjectStatus;
};

const projectCardMetaMap: Record<string, ProjectCardMeta> = {
	pocaz: {
		category: "Product",
		featured: true,
		impact: "분산된 포토카드 리셀 거래 과정을 하나의 전문 거래 흐름으로 재설계했습니다.",
		result: "검색, 찜, 채팅, 거래 관리가 이어지는 리메이크 버전을 구현하고 공개했습니다.",
		status: "Prototype",
	},
	"daedo-law": {
		category: "Client",
		featured: true,
		impact: "법률사무소의 신뢰감을 해치지 않도록 정보 구조와 운영 흐름을 정리했습니다.",
		result: "실서비스 웹사이트와 관리자 운영 기반을 함께 전달했습니다.",
		status: "Live",
	},
	"choose-menu": {
		category: "Product",
		featured: true,
		impact: "메뉴 선택 시간을 줄이는 추천 경험과 운영 도구를 함께 검증했습니다.",
		result: "크롤링, 추천, 관리자 기능이 연결된 실사용 가능한 프로토타입을 배포했습니다.",
		status: "Live",
	},
	"alltime-car": {
		category: "Product",
		featured: true,
		impact: "여러 렌트사 가격 비교를 빠르게 탐색할 수 있는 검색 경험을 만들었습니다.",
		result: "최저가 비교와 필터링 중심의 예약 탐색 프로토타입을 운영했습니다.",
		status: "Live",
	},
	"frontend-junior-study": {
		category: "Study",
		featured: false,
		impact: "프론트엔드 학습 범위를 15주 커리큘럼으로 구조화해 재사용 가능한 학습 흐름을 만들었습니다.",
		result: "학습 주제, 예제, 기록을 연결한 공개 학습 저장소를 완성했습니다.",
		status: "Archived",
	},
	"react-devtool-cli": {
		category: "Product",
		featured: false,
		impact: "React inspection과 profiling을 에이전트/개발자가 재현 가능한 CLI 흐름으로 옮겼습니다.",
		result: "npm 배포와 공개 릴리스를 포함한 agent-first debugging 도구를 출시했습니다.",
		status: "Live",
	},
};

export function getProjectPrimaryHref(project: ProjectDetail) {
	return (
		project.links.demo ??
		project.links.github ??
		project.links.etc?.[0]?.url ??
		`/project/${project.slug}`
	);
}

export function getProjectYearFromPeriod(period: string) {
	const matchedYear = period.match(/\d{4}/)?.[0];

	if (matchedYear) {
		return Number.parseInt(matchedYear, 10);
	}

	return Number.NaN;
}

export const projectList: ProjectProps[] = projectDetailList.map((project) => {
	const meta = projectCardMetaMap[project.slug];

	if (!meta) {
		throw new Error(`Missing project card metadata for slug: ${project.slug}`);
	}

	return {
		src: project.thumbnail,
		title: project.title,
		href: getProjectPrimaryHref(project),
		slug: project.slug,
		description: project.summary,
		techStack: project.tech.stack,
		featured: meta.featured,
		category: meta.category,
		year: getProjectYearFromPeriod(project.period),
		role: project.role,
		impact: meta.impact,
		result: meta.result,
		status: meta.status,
	};
});

export function getFeaturedProjects(limit = 3) {
	return projectList
		.filter((project) => project.featured)
		.toReversed()
		.slice(0, limit);
}
