import Image from "next/image";
import { Container } from "../component/introduce";

export default function Page() {
  return (
    <div id="d-variaty">
      <Container />
      <div
        style={{ width: "300px", height: "300px" }}
        className="modify-big circle"
      >
        <Image
          src={"https://avatars.githubusercontent.com/u/70439662?v=4"}
          alt="profile"
          className="circle"
          fill
        />
      </div>
    </div>
  );
}
