import { Get, Controller, Render } from '@nestjs/common';
import { DoctorsService } from './doctors/doctors.service';
import { SkillsService } from './skills/skills.service';

@Controller()
export class AppController {
  constructor(
    private doctorsService: DoctorsService,
    private skillsService: SkillsService,
  ) {}

  @Get()
  @Render('index')
  async root() {
    const doctorsData = await this.doctorsService.findAll();
    return { doctorsData };
  }

  @Get('create')
  @Render('create')
  async createDoctor() {
    const skillsData = await this.skillsService.findAll();
    const stringfiedSkills = encodeURIComponent(JSON.stringify(skillsData));
    return { skillsData, stringfiedSkills };
  }

  @Get('search')
  @Render('search')
  async searchDoctors() {
    const doctors = await this.doctorsService.findAll();
    const stringfiedDoctors = encodeURIComponent(JSON.stringify(doctors));
    return { doctors, stringfiedDoctors };
  }
}
