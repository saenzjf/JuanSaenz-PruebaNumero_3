'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('comentarios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: Sequelize.STRING,
      },
      TutorialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tutorials',
          key: 'id',
        }
      }
    });
  
  },

  async down (queryInterface, Sequelize) {
    
  }
};
