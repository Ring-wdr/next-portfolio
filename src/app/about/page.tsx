import Link from "next/link";
import { DescWrapper, LoadingImage } from "@/component/common";

export default function Page() {
  return (
    <div className="d-flex flex-column justify-cc mt-3">
      <h3 className="mb-2 text-center font-20">
        🥰&nbsp;WHY FRONTEND Developer?? 👨🏻‍💻
      </h3>
      <DescWrapper>
        데이터 분석 공부하던 중 분석에서 끝나는 것이 아닌 본인의 프로덕트를
        만들어 낼 수 있는 SW개발에 흥미가 생기게 되어 입문하게 되었습니다.
        &nbsp;
        <Link
          href="https://developer.mozilla.org/ko/docs/Web/JavaScript"
          className="tc-yellow"
        >
          JavaScript
        </Link>{" "}
        기본기를 다지면서 개발 트렌드를 살펴보았고 트렌드의 변화로 인해 개발
        과정의 많은 부분이 프론트엔드로 넘어가는 것을 보았습니다. 코드 작성 후
        결과물의 즉각적인 변화를 확인할 수 있는 점이 흥미에도 맞다고 생각하여
        현재는&nbsp;
        <strong>프론트엔드 직무</strong>로 근무하는 주니어 개발자입니다. <br />
        <Link href={"https://react.dev/"} style={{ color: "cyan" }}>
          <i className="ri-reactjs-fill"></i>React 18
        </Link>
        &nbsp; 기반 팀 프로젝트 경험이 있습니다. 협업을 우선시하며 문제 해결을
        위해서는 기다리기보다 먼저 다양한 관점에서 도전하려고 합니다. 제가
        작성한 코드나 결과물을 팀원이 사용하고나서 피드백할 때 뿌듯함을
        느낍니다. 그래서 개발 환경 내에서 팀원들이 API를 바로 테스트 할 수 있게
        swagger를 사용했습니다. <br /> 현재는&nbsp;
        <Link href={"https://www.typescriptlang.org/"} className="tc-blue">
          TypeScript
        </Link>
        ,&nbsp;
        <Link href="https://nextjs.org/" style={{ color: "black" }}>
          Next 13
        </Link>
        ,&nbsp;
        <Link href="https://kit.svelte.dev/" style={{ color: "crimson" }}>
          sveltekit
        </Link>
        를 사용 중입니다.
      </DescWrapper>
      <h3 className="mt-5 mb-2 text-center font-20">
        <Link
          className="tc-green"
          href="https://blog.naver.com/enne123"
          target="_blank"
          rel="noopener noreferrer"
        >
          🧾Recording... ⌨️
        </Link>
      </h3>
      <DescWrapper>
        배운 채로 방치하지 말고 내가 쓸 수 있도록 소화!🧽 적자생존! 적어야
        산다는 말이 있습니다. 프로그래밍 언어, 라이브러리 및 프레임워크를
        공부하고 사용하면서 나중에 재사용할만한 내용들을 수시로 블로그에
        기록하고 있습니다. 지나가던 사람이 제 블로그의 글을 읽는 것만으로 도움이
        되도록 열심히 적어보겠습니다.
      </DescWrapper>
    </div>
  );
}
