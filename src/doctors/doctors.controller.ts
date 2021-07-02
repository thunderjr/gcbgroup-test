import {
  Body,
  Controller,
  Delete,
  Get,
  HttpService,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Doctor, Address } from './doctor.entity';
import { Skill } from '../skills/skill.entity';

import { DoctorsService } from './doctors.service';
import { SkillsService } from '../skills/skills.service';

import { CreateDoctorDTO, SkillWithId } from './dto/create-doctor.dto';
import { CreateAddressDTO } from './dto/create-address.dto';

import { UpdateDoctorDTO } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(
    private doctorsService: DoctorsService,
    private skillsService: SkillsService,
    private httpService: HttpService,
  ) {}

  @Get('/search')
  async findByAttr(
    @Query('key') key: string,
    @Query('q') q: any,
  ): Promise<Doctor[]> {
    return this.doctorsService.findByAttr(key, q);
  }

  @Get('/')
  async findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Doctor> {
    return this.doctorsService.findOne(id);
  }

  @Post('/')
  async create(
    @Body()
    doctor: CreateDoctorDTO,
  ): Promise<Doctor> {
    const { cep, skills } = doctor;

    const createdSkills = await this.createNewSkills(skills);
    const createdDoctor = await this.doctorsService.create({
      ...doctor,
      skills: createdSkills,
    });

    await this.createAddressByCep(cep, createdDoctor.id);
    return this.doctorsService.findOne(createdDoctor.id);
  }

  @Patch(':id')
  async update(
    @Body() body: UpdateDoctorDTO,
    @Param('id') id: number,
  ): Promise<[number, Doctor[]]> {
    return this.doctorsService.update(body, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.doctorsService.delete(id);
  }

  private zeroFill(cep) {
    return `${Array(8 - cep.toString().length)
      .fill(0)
      .join('')}${cep}`;
  }

  async createNewSkills(skills: Skill[]): Promise<SkillWithId[]> {
    // Array que contém as Especialidades já registradas e será preenchido com as que serão criadas
    const allSkills: SkillWithId[] = skills
      .filter((sk) => !!sk.id)
      .map((x) => <SkillWithId>{ id: x.id, ...x });

    // Especialidades que não estão cadastradas, portanto, não possuem ID
    let newSkills: SkillWithId[] = skills
      .filter(({ id }) => !id)
      .map((x) => <SkillWithId>{ id: x.id, ...x });

    if (newSkills.length) {
      newSkills = await Promise.all(
        newSkills.map((skill) => this.skillsService.findOrCreate(skill.name)),
      ).then((vals) => {
        return vals.map(
          ([createdSkill]) =>
            <SkillWithId>{ id: createdSkill.id, ...createdSkill },
        );
      });
      allSkills.push(...newSkills);
    }
    return allSkills;
  }

  async createAddressByCep(cep: number, doctorId: number): Promise<Address> {
    const response = await this.httpService
      .get(`https://viacep.com.br/ws/${this.zeroFill(cep)}/json/`)
      .toPromise();

    const { logradouro, bairro, localidade, uf } = response.data;
    return Address.create(<CreateAddressDTO>{
      cep,
      street: logradouro,
      district: bairro,
      city: localidade,
      state: uf,
      doctorId,
    });
  }
}
