'use strict';

module.exports = {
  // gravar
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
     },
     //criando relacionamento com usuario
      user_id:{
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate:'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      collaborator_id:{
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate:'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      canceled_at:{
        type: Sequelize.DATE

      },
      created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },
// commitar
  down: async queryInterface => {
    return queryInterface.dropTable('appointments')
  }
};
