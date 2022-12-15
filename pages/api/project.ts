export interface IProj {
  id: number;
  projName: string;
  projImg: string;
  projDesc?: string;
}

export const projectList: IProj[] = [
  {
    id: 1,
    projName: 'POCAZ',
    projImg: '',
    projDesc: '',
  },
];
