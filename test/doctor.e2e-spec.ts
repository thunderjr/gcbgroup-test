import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('DoctorController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('POST /doctors', () => {
    const dto = {
      name: 'Paulo Braga',
      crm: 1234568,
      phone: '+551234567890',
      mobile_phone: '1112324000',
      cep: 1001000,
      skills: [
        {
          name: 'Buco maxilo',
        },
        {
          name: 'NovaEspecialidadeTeste',
        },
      ],
    };
    return request(app.getHttpServer()).post('/doctors').send(dto).expect(201);
  });

  test('GET /doctors', () => {
    return request(app.getHttpServer()).get('/doctors').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
