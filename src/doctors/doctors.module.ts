import { Module, HttpModule } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { DatabaseModule } from '../database/database.module';
import { doctorsProviders } from './doctors.providers';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [DatabaseModule, SkillsModule, HttpModule],
  controllers: [DoctorsController],
  providers: [DoctorsService, ...doctorsProviders],
  exports: [DoctorsService],
})
export class DoctorsModule {}
