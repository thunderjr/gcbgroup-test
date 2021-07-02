import { Inject, Injectable } from '@nestjs/common';

import { Doctor, Address } from './doctor.entity';
import { Skill } from '../skills/skill.entity';

import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { UpdateDoctorDTO } from './dto/update-doctor.dto';
import { Op } from 'sequelize';

@Injectable()
export class DoctorsService {
  constructor(
    @Inject('DOCTORS_REPOSITORY') private doctorsRepository: typeof Doctor,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.findAll<Doctor>({
      include: [
        {
          model: Skill,
          through: {
            attributes: [],
          },
        },
        Address,
      ],
    });
  }

  async findOne(id: number): Promise<Doctor> {
    return this.doctorsRepository.findOne({
      where: { id },
      include: [
        {
          model: Skill,
          through: {
            attributes: [],
          },
        },
        Address,
      ],
    });
  }

  async findByAttr(attr: string, value: any): Promise<Doctor[]> {
    let mainWhere = { [attr]: { [Op.startsWith]: value } };
    let addrInclude: any = Address;

    if (attr.indexOf('.')) {
      const [model, key] = attr.split('.');
      if (model === 'address') {
        mainWhere = {};
        addrInclude = {
          model: Address,
          where: { [key]: { [Op.substring]: value } },
        };
      }
    }

    return this.doctorsRepository.findAll({
      where: mainWhere,
      include: [
        {
          model: Skill,
          through: {
            attributes: [],
          },
        },
        addrInclude,
      ],
    });
  }

  async create(doctor: CreateDoctorDTO): Promise<Doctor> {
    return this.doctorsRepository.create(doctor).then(async (newDoctor) => {
      await this.addSkillsToDoctor(doctor.skills, newDoctor);
      return newDoctor;
    });
  }

  async update(body: UpdateDoctorDTO, id: number): Promise<[number, Doctor[]]> {
    return this.doctorsRepository.update(body, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return this.doctorsRepository.destroy({ where: { id } });
  }

  private async addSkillsToDoctor(skills: Skill[], doctor: Doctor) {
    return Promise.all(skills.map(({ id }) => doctor.$add('skills', id)));
  }
}
