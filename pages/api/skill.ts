const SKILL_TYPE = {
  language: 'Language',
  library: 'Library',
  framework: 'Framework',
  database: 'Database',
} as const;
export interface ISkill {
  id: number;
  skillName: string;
  skillImg: string;
  skillType: typeof SKILL_TYPE[keyof typeof SKILL_TYPE];
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
  {
    id: 4,
    skillName: 'Next.js',
    skillImg:
      'https://camo.githubusercontent.com/f21f1fa29dfe5e1d0772b0efe2f43eca2f6dc14f2fede8d9cbef4a3a8210c91d/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67',
    skillType: 'Framework',
  },
  {
    id: 5,
    skillName: 'React',
    skillImg: 'https://techstack-generator.vercel.app/react-icon.svg',
    skillType: 'Library',
  },
  {
    id: 6,
    skillName: 'express',
    skillImg: 'https://www.nextontop.com/assets/img/services/web/expressjs.svg',
    skillType: 'Framework',
  },
  {
    id: 7,
    skillName: 'mysql',
    skillImg: 'https://techstack-generator.vercel.app/mysql-icon.svg',
    skillType: 'Database',
  },

  {
    id: 8,
    skillName: 'swagger',
    skillImg:
      'https://cdn.discordapp.com/attachments/1005416392096497664/1042431974440194109/unknown.png',
    skillType: 'Library',
  },

  {
    id: 9,
    skillName: 'react-query',
    skillImg:
      'https://raw.githubusercontent.com/TanStack/query/9511933f258b9f87f000938d1583e2b301e3d912/media/emblem-light.svg',
    skillType: 'Library',
  },
  {
    id: 10,
    skillName: 'ESLint',
    skillImg: 'https://techstack-generator.vercel.app/eslint-icon.svg',
    skillType: 'Library',
  },
  {
    id: 11,
    skillName: 'prettier',
    skillImg: 'https://techstack-generator.vercel.app/prettier-icon.svg',
    skillType: 'Library',
  },
  {
    id: 12,
    skillName: 'socket.io',
    skillImg:
      'https://raw.githubusercontent.com/bestofjs/bestofjs-webui/dd29d40f829c2cea9cbd7ffac13a3add888e2199/public/logos/socketio.svg',
    skillType: 'Framework',
  },
  {
    id: 13,
    skillName: 'sveltekit',
    skillImg:
      'https://kit.svelte.dev/_app/immutable/assets/svelte-logo.5c5d7d20.svg',
    skillType: 'Framework',
  },
];
