'use strict';
//essa migration é feita para relacionar a imagem com o usuário, crianod uma coluna photo_id na tabela de usuarios onde podemos relacionar a tabela de files através do id
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'photo_id',
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id'},
        onUpdate:'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeCol('users', 'photo_id')
  }
};
