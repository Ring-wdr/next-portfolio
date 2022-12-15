import Image from 'next/image';
import { skillList } from './api/skill';
import styles from './css/index.module.css';

export default function Home() {
  return (
    <div>
      <section className={styles.container}>
        <div className={styles.greeting}>
          <div className={styles.welcome}>
            제 포트폴리오에 오신 것을 환영합니다!
          </div>
          <div className={styles.rolling}>
            <h1>
              I&apos;m <span>Kim Man-Joong</span>{' '}
            </h1>
          </div>
          <div className={styles.desc}>
            데이터 분석 공부 중 SW개발에 흥미가 생기게 되어 진로를 변경하여
            &nbsp;
            <b style={{ color: 'yellow' }}>JavaScript</b> 기본기를 갖추고
            현재&nbsp;
            <strong>프론트엔드 직무를 희망</strong>하는 예비 주니어
            개발자입니다. 개발자 교육을 수료하였으며{' '}
            <b style={{ color: 'cyan' }}>
              <i className='ri-reactjs-fill'></i>React 18
            </b>{' '}
            기반 팀 프로젝트 경험이 있습니다. 협업을 우선시하며 문제 해결을
            위해서는 기다리기보다 먼저 다양한 관점에서 도전하려고 합니다. 개발
            환경 내에서 API를 바로 테스트 할 수 있게 swagger를 사용했습니다.
            제가 작성한 코드나 결과물을 팀원이 사용하고나서 피드백할 때 뿌듯함을
            느낍니다. 현재 <b style={{ color: '#4b56d2' }}>TypeScript</b> , Next
            학습 중입니다.
          </div>
        </div>
        {/* <div className='img-box'>
          <Image
            src={`https://raw.githubusercontent.com/judygab/web-dev-projects/3099dfd4ab2683c422e0f4e662d84b8a147db245/personal-portfolio/src/assets/img/header-img.svg`}
            alt='두둥실'
            width={400}
            height={400}
          />
        </div> */}
      </section>

      <div className={styles['skill-box']}>
        <div className={styles['skill-logo']}>
          <h3>SKILL</h3>
        </div>
        <div className={styles['skill-desc']}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nisi,
          odio itaque harum commodi dolore repellat eum non asperiores. Harum
          libero aliquam ipsa dolorem eos placeat illo a ullam vero!
        </div>
        {/* <div className={styles['skill-list']}>
          <div>
            <h2 style={{ color: 'white' }}>Language</h2>
            <ul className='skill-language'>
              {skillList
                .filter((skill) => skill.skillType === 'Language')
                .map(({ id, skillImg, skillName }) => (
                  <li key={id}>
                    <h3>{skillName}</h3>
                    <Image
                      src={skillImg}
                      alt={skillName}
                      width={200}
                      height={200}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}
