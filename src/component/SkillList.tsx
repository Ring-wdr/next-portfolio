// import Image from "next/image";
import styles from "./css/skill.module.css";
// import { skillList } from "../pages/api/skill";
import { useUpDown } from "../hooks/useUpDown";

const skillType = ["Language", "Library", "Framework", "Database"];

export const SkillList = () => {
  const [typeKey, onIncrease, onDecrease] = useUpDown();
  return (
    <div className={styles["skill-box"]}>
      <div className={styles["skill-logo"]}>
        <h3>SKILL</h3>
      </div>
      <div className={styles["skill-desc"]}>
        저에게 있어 개발에 가장 중요한 것은 <strong>지속가능함</strong>
        입니다. 아래는 현재까지 습득한 기술들이며 이미 프로젝트에서 사용하였거나
        현재 학습 중인 모든 기술들을 작성하였습니다. 기술 하나에만 치우치지 않고
        최대한 다양한 것들을 접하여 필요한 상황이 발생할 때 적재적소에 사용할 수
        있는 훌륭한 개발자가 되도록 노력중입니다.
      </div>
      <div className={styles["skill-list"]}>
        <div>
          <button onClick={() => typeKey > 0 && onDecrease()}> &lt; </button>
          <h3 style={{ color: "white" }}>{skillType[typeKey]}</h3>
          <button
            onClick={() => typeKey < skillType.length - 1 && onIncrease()}
          >
            &gt;
          </button>
        </div>
        {/* <ul className={styles['skill-category']}>
          {skillList
            .filter((skill) => skill.skillType === skillType[typeKey])
            .map(({ id, skillImg, skillName }) => (
              <li key={id}>
                <h3>{skillName}</h3>
                <Image
                  src={skillImg}
                  alt={skillName}
                  width={100}
                  height={100}
                />
              </li>
            ))}
        </ul> */}
      </div>
    </div>
  );
};
