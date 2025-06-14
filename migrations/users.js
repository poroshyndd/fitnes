// e.g. backend/migrations/20250613090000-add-profile-fields-to-users.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'weight', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'height', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'height');
    await queryInterface.removeColumn('Users', 'weight');
    await queryInterface.removeColumn('Users', 'name');
  }
};
