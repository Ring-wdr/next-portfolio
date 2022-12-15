export interface ISkill {
  id: number;
  skillName: string;
  skillImg: string;
  skillType: string;
}

export const skillList: ISkill[] = [
  {
    id: 1,
    skillName: 'JavaScript',
    skillImg:
      'https://camo.githubusercontent.com/96957898ffe21362873d403f4db838db8bff560bbcf12082e77ddb609d628b45/68747470733a2f2f6d656469612e74656e6f722e636f6d2f545265556f6a4e6c5a367741414141692f6a732d6a6176617363726970742e676966',
    skillType: 'Language',
  },
  {
    id: 2,
    skillName: 'TypeScript',
    skillImg:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
    skillType: 'Language',
  },
  {
    id: 3,
    skillName: 'CSS',
    skillImg:
      'https://camo.githubusercontent.com/46a9f033120f5ef62f800728b8cadac9780a4df6f921b32af44ad9552d8e72a6/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f642f64352f5461696c77696e645f4353535f4c6f676f2e7376672f3132303070782d5461696c77696e645f4353535f4c6f676f2e7376672e706e673f3230323131303031313934333333',
    skillType: 'Language',
  },
];
