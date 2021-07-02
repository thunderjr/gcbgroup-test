import {
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Doctor } from '../doctors/doctor.entity';

@Table({ timestamps: false })
export class Skill extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Doctor, () => DoctorSkill)
  doctors: Doctor[];
}

@Table({ timestamps: false })
export class DoctorSkill extends Model {
  @ForeignKey(() => Doctor)
  @Column
  doctorId: number;

  @ForeignKey(() => Skill)
  @Column
  skillId: number;
}
