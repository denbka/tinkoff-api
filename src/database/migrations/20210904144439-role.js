'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.createTable('roles', {
      id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, unique: true, allowNull: false },
      description: { type: Sequelize.STRING, unique: true, allowNull: false }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('roles')
  }
};
