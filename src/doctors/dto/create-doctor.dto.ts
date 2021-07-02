import { Skill } from 'src/skills/skill.entity';
import {
  ArrayMinSize,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export interface SkillWithId extends Skill {
  id: number;
}

export class CreateDoctorDTO {
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  crm: number;

  @IsPhoneNumber('BR')
  @MaxLength(13)
  @IsNotEmpty()
  phone: number;

  @IsMobilePhone('pt-BR')
  @IsNotEmpty()
  mobile_phone: number;

  @IsNumber()
  @IsNotEmpty()
  cep: number;

  @ArrayMinSize(2)
  @ValidateNested()
  skills: SkillWithId[];
}
