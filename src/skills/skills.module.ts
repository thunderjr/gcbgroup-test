import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { DatabaseModule } from '../database/database.module';
import { skillsProviders } from './skills.providers';

@Module({
  imports: [DatabaseModule],
  providers: [SkillsService, ...skillsProviders],
  exports: [SkillsService],
})
export class SkillsModule {}
