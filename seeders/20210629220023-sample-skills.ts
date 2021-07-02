'use strict';

module.exports = {
  up: (queryInterface) => {
    const skills = [
      'Alergologia',
      'Angiologia',
      'Buco maxilo',
      'Cardiologia clínca',
      'Cardiologia infantil',
      'Cirurgia cabeça e pescoço',
      'Cirurgia cardíaca',
      'Cirurgia de tórax',
    ];
    return queryInterface.bulkInsert(
      'Skills',
      skills.map((skill) => ({ name: skill })),
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Skills', null, {});
  },
};
