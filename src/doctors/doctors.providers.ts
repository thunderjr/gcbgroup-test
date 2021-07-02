import { Doctor } from './doctor.entity';

export const doctorsProviders = [
  {
    provide: 'DOCTORS_REPOSITORY',
    useValue: Doctor,
  },
];
