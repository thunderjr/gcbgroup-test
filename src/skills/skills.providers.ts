import { Skill } from './skill.entity';

export const skillsProviders = [
  {
    provide: 'SKILLS_REPOSITORY',
    useValue: Skill,
  },
];
