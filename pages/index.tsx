import { Floating } from '../component/Floating';
import { Introduce } from '../component/Introduce';
import { SkillList } from '../component/SkillList';

export default function Home() {
  return (
    <div>
      <Introduce />
      <SkillList />
      <Floating />
    </div>
  );
}
