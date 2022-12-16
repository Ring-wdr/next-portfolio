import Image from 'next/image';
import styles from './css/project.module.css';

export default function Project() {
  return (
    <div className={styles.page}>
      <div className={styles.list}>
        <ul>
          <li>
            <div className={styles.imgbox}>
              <a
                href='https://github.com/TEAM-POCAZ/PocaZ'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='https://camo.githubusercontent.com/3414dc60e6294021c229f1cbb8d3c6933ea805681610f933b055dafe3cb61854/68747470733a2f2f696d67312e6461756d63646e2e6e65742f7468756d622f523132383078302f3f73636f64653d6d746973746f72793226666e616d653d68747470732533412532462532466b2e6b616b616f63646e2e6e6574253246646e2532467745336c4325324662747252704453565259592532465270776e46316a6e59504f6834335552306f55594a4b253246696d672e706e67'
                  alt='pocaz main'
                  width={300}
                  height={200}
                />
              </a>
            </div>
            <div className={styles.desc}>
              <h3>PROJECT NAME: POCAZ</h3>
              국내 외 아이돌 굿즈 시장이 8000억 규모 이상으로 확대되고 있는 걸
              알고 계신가요? 특히, 아이돌 굿즈의 주식 시장이라고 불리는 아이돌
              포토카드 리셀 거래에 관심이 높아지고 있습니다. 아이돌 포토카드
              수집이 하나의 문화로 자리잡았고 현재 포토카드 리셀 거래가 트위터,
              번개장터, 당근마켓 등에서 거래가 활발히 이루어지고 있는
              추세입니다. 전문화되지 않은 장터들에서의 거래에 따른 사용자 불편을
              확인하여, 아이돌 포토카드를 전문으로 다루는 거래 공간을 만들게
              되었습니다.
            </div>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .proj-page {
          display: static;
        }
      `}</style>
    </div>
  );
}
