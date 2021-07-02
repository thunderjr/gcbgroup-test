import { Inject, Injectable } from '@nestjs/common';

import { Skill } from './skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @Inject('SKILLS_REPOSITORY')
    private skillsRepository: typeof Skill,
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillsRepository.findAll();
  }

  async findOne(id: number): Promise<Skill> {
    return this.skillsRepository.findOne({
      where: { id },
    });
  }

  async findOrCreate(name: string) {
    return this.skillsRepository.findOrCreate({
      where: { name },
    });
  }

  async create(skill: Skill): Promise<Skill> {
    return this.skillsRepository.create(skill);
  }
}
