import { Test, TestingModule } from '@nestjs/testing';

import { Doctor } from './doctor.entity';

import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { doctorsProviders } from './doctors.providers';
import { SkillsModule } from '../skills/skills.module';
import { HttpModule } from '@nestjs/common';
import { CreateDoctorDTO } from './dto/create-doctor.dto';

describe('DoctorsController', () => {
  let doctorsController: DoctorsController;
  let doctorsService: DoctorsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SkillsModule, HttpModule],
      controllers: [DoctorsController],
      providers: [DoctorsService, ...doctorsProviders],
    }).compile();

    doctorsController = module.get<DoctorsController>(DoctorsController);
    doctorsService = module.get<DoctorsService>(DoctorsService);
  });

  // test('expect to create a doctor with his address and skills', async () => {
  //   const doc = <CreateDoctorDTO>{
  //     name: 'Mateus Jesus',
  //     crm: 1234567,
  //     phone: 551234567890,
  //     mobile_phone: 551112324000,
  //     cep: 1001000,
  //     skills: [
  //       {
  //         name: 'Buco maxilo',
  //       },
  //       {
  //         name: 'Angiologia',
  //       },
  //     ],
  //   };
  //   expect(doctorsController.create(doc)).resolves.toMatchObject({
  //     id: expect.any(Number),
  //     name: 'Mateus Jesus',
  //     crm: 1234567,
  //     phone: '+551234567890',
  //     mobile_phone: '1112324000',
  //     cep: 1001000,
  //     skills: [
  //       {
  //         id: expect.any(Number),
  //         name: 'Angiologia',
  //       },
  //       {
  //         id: expect.any(Number),
  //         name: 'Buco maxilo',
  //       },
  //     ],
  //     address: expect.objectContaining({
  //       id: expect.any(Number),
  //       cep: 1001000,
  //       street: expect.any(String),
  //       district: expect.any(String),
  //       city: expect.any(String),
  //       state: expect.any(String),
  //       doctorId: expect.any(Number),
  //     }),
  //   });
  // });

  test('expect findOne to return the new created Doctor', async () => {
    const doc = <CreateDoctorDTO>{
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
    const createdDoctor = await doctorsController.create(doc);
    await expect(doctorsController.findOne(createdDoctor.id)).resolves.toEqual(
      createdDoctor,
    );
  });

  test('expect to findAll to return an array', async () => {
    expect(Array.isArray(await doctorsController.findAll())).toBe(true);
  });
});
