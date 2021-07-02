import { Test, TestingModule } from '@nestjs/testing';

import { Doctor } from './doctor.entity';

import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { doctorsProviders } from './doctors.providers';
import { SkillsModule } from '../skills/skills.module';
import { HttpModule } from '@nestjs/common';

describe('DoctorsController', () => {
  let doctorsController: DoctorsController;
  let doctorsService: DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SkillsModule, HttpModule],
      controllers: [DoctorsController],
      providers: [DoctorsService, ...doctorsProviders],
    }).compile();

    doctorsController = module.get<DoctorsController>(DoctorsController);
    doctorsService = module.get<DoctorsService>(DoctorsService);
  });

  test('findOne', async () => {
    const doc = {
      id: 1,
      name: 'Mateus Jesus',
      crm: 1234567,
      phone: 551234567890,
      mobile_phone: 551112324000,
      cep: 1001000,
      skills: [
        {
          name: 'Buco maxilo',
        },
        {
          name: 'Angiologia',
        },
      ],
    };

    jest
      .spyOn(doctorsService, 'findOne')
      .mockImplementation(async () => <Doctor>doc);

    expect(await doctorsController.findOne(1)).toBe(doc);
  });

  test('findAll', async () => {
    const doc: Doctor[] = [
      <Doctor>{
        name: 'Mateus Jesus',
        crm: 1234567,
        phone: 551234567890,
        mobile_phone: 551112324000,
        cep: 1001000,
        skills: [
          {
            name: 'Buco maxilo',
          },
          {
            name: 'Angiologia',
          },
        ],
      },
    ];

    jest
      .spyOn(doctorsService, 'findAll')
      .mockImplementation(async (): Promise<Doctor[]> => doc);

    expect(await doctorsController.findAll()).toBe(doc);
  });
});
