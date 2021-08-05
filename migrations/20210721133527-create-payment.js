'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      payment_mode: {
        type: Sequelize.STRING
      },
      session: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      buyer_address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payment');
  }
};