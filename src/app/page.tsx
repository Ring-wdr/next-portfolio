import Image from "next/image";
import { Container, Header, ShowBox } from "@/component/introduce";

export default function Page() {
  return (
    <>
      <div id="d-variaty">
        <Container />
        <div className="p-rel d-flex justify-cc">
          <div
            style={{ width: "300px", height: "300px" }}
            className="modify-big circle float"
          >
            <Image
              src={"https://avatars.githubusercontent.com/u/70439662?v=4"}
              alt="profile"
              className="circle"
              fill
            />
          </div>
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
