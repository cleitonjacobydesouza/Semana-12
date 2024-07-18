'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('alunos', 'email', {
      allowNull: false,
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('alunos', 'password', {
      allowNull: false,
      type: Sequelize.STRING
    });

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.removeColumn('alunos', 'email');

      await queryInterface.removeColumn('alunos', 'password');

  }
};
