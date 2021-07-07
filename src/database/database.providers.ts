import { Sequelize } from 'sequelize-typescript';
import { Doctor, Address } from '../doctors/doctor.entity';
import { Skill, DoctorSkill } from '../skills/skill.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.NODE_ENV == 'docker' ? 'mysql' : 'localhost',
        port: process.env.NODE_ENV == 'docker' ? 3306 : 3308,
        username: 'root',
        password: 'password',
        database: 'gcb-test',
      });
      sequelize.addModels([Doctor, Skill, DoctorSkill, Address]);
      await sequelize.sync();

      const skills = await Skill.findAll();

      if (!skills.length) {
        sequelize.sync({ force: true }).then(() => {
          const initialSkills = [
            'Alergologia',
            'Angiologia',
            'Buco maxilo',
            'Cardiologia clínca',
            'Cardiologia infantil',
            'Cirurgia cabeça e pescoço',
            'Cirurgia cardíaca',
            'Cirurgia de tórax',
          ];

          sequelize.getQueryInterface().bulkInsert(
            'Skills',
            initialSkills.map((skill) => ({ name: skill })),
          );
        });
      }

      return sequelize;
    },
  },
];
