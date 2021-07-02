import {
  BelongsToMany,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Skill, DoctorSkill } from '../skills/skill.entity';

@Table({ timestamps: false })
export class Address extends Model {
  @Column(DataType.INTEGER({ length: 8 }))
  cep: number;

  @Column
  street: string;

  @Column
  district: string;

  @Column
  city: string;

  @Column
  state: string;

  @ForeignKey(() => Doctor)
  doctorId: number;
}

@Table
export class Doctor extends Model {
  @Column(DataType.STRING(120))
  name: string;

  @Column(DataType.INTEGER({ length: 7 }))
  crm: number;

  @Column(DataType.STRING({ length: 13 }))
  phone: number;

  @Column(DataType.STRING({ length: 14 }))
  mobile_phone: number;

  @ForeignKey(() => Address)
  @Column(DataType.INTEGER({ length: 8 }))
  cep: number;

  @HasOne(() => Address, 'doctorId')
  address: Address;

  @BelongsToMany(() => Skill, () => DoctorSkill)
  skills: Skill[];

  @DeletedAt
  deleted_at: string;
}
