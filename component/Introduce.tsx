import Image from 'next/image';
import styles from './css/introduce.module.css';

export const Introduce = () => {
  return (
    <section className={styles.container}>
      <div className={styles.greeting}>
        <div className={styles.welcome}>포트폴리오에 오신 것을 환영합니다!</div>
        <div className={styles.desc}>
          <h3 style={{ color: 'white', marginBottom: '2rem' }}>
            🥰&nbsp;WHY FRONTEND Developer?? 👨🏻‍💻
          </h3>
          데이터 분석 공부 중 SW개발에 흥미가 생기게 되어 진로를 변경하여 공부를
          시작하였습니다. &nbsp;
          <b style={{ color: '#FFFBC1' }}>JavaScript</b> 기본기를 다지면서 개발
          트렌드를 살펴보았고 트렌드의 변화로 인해 개발의 많은 부분이
          프론트엔드로 넘어가는 것을 보았습니다. 코드 작성 후 결과물의 즉각적인
          변화를 확인할 수 있는 점이 흥미에도 맞다고 생각하여 현재는&nbsp;
          <strong>프론트엔드 직무를 희망</strong>하는 예비 주니어 개발자입니다.
          &nbsp;
          <b style={{ color: 'cyan' }}>
            <i className='ri-reactjs-fill'></i>React 18
          </b>{' '}
          기반 팀 프로젝트 경험이 있습니다. 협업을 우선시하며 문제 해결을
          위해서는 기다리기보다 먼저 다양한 관점에서 도전하려고 합니다. 제가
          작성한 코드나 결과물을 팀원이 사용하고나서 피드백할 때 뿌듯함을
          느낍니다. 그래서 개발 환경 내에서 팀원들이 API를 바로 테스트 할 수
          있게 swagger를 사용했습니다. 현재{' '}
          <b style={{ color: '#9ca3e7' }}>TypeScript</b> , Next 학습 중입니다.
        </div>
        <div className={styles.desc}>
          <h3 className={styles.blog}>
            <a
              href='https://blog.naver.com/enne123'
              target='_blank'
              rel='noopener noreferrer'
            >
              🧾Recording... ⌨️
            </a>
          </h3>
          배운 채로 방치하지 말고 내가 쓸 수 있도록 소화!🧽 적자생존! 적어야
          산다는 말이 있습니다. &nbsp;
          <b style={{ color: '#FFFBC1' }}>JavaScript,</b>&nbsp;
          <b style={{ color: '#9ca3e7' }}>TypeScript,</b>&nbsp;
          <b style={{ color: 'cyan' }}>
            <i className='ri-reactjs-fill'></i>React&nbsp;18
          </b>
          &nbsp; 등 언어, 라이브러리, 프레임워크를 공부하면서 적어두어야할
          내용은 수시로 블로그에 기록하고 있습니다. 지나가던 사람이 제 블로그의
          글을 읽는 것만으로 도움이 되도록 열심히 적어보겠습니다.
        </div>
      </div>
      <div className={styles['img-box']}>
        <Image
          src={`https://raw.githubusercontent.com/judygab/web-dev-projects/3099dfd4ab2683c422e0f4e662d84b8a147db245/personal-portfolio/src/assets/img/header-img.svg`}
          alt='두둥실'
          width={400}
          height={400}
        />
      </div>
    </section>
  );
};
