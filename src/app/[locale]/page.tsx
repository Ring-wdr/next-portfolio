import Image from "next/image";
import { Container, Header, ShowBox } from "@/component/introduce";

export default function Page() {
  return (
    <>
      <div id="d-variaty" className="mt-5">
        <Container />
        <div className="p-rel d-flex justify-cc ">
          <Image
            src={"https://avatars.githubusercontent.com/u/70439662?v=4"}
            alt="profile"
            width={300}
            height={300}
            className="modify-big circle float"
            priority
          />
        </div>
      </div>
      <Header>
        <div>With Including Skill</div>
        <p>Currently or previously used skill</p>
      </Header>
      <ShowBox />
    </>
  );
}
