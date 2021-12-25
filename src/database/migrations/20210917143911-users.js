'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      return queryInterface.sequilize.transaction(t => {
        return queryInterface.addColumn(
          'users',
          'tinkoff_broker_account_id',
          Sequelize.STRING,
        )
      })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     return queryInterface.sequilize.transaction(t => {
      return queryInterface.removeColumn(
        'users',
        'tinkoff_broker_account_id',
        Sequelize.STRING
      )
    })
  }
};
