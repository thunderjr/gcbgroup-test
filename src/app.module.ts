import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DoctorsModule } from './doctors/doctors.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [DoctorsModule, SkillsModule],
  controllers: [AppController],
})
export class AppModule {}
