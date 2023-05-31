// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     return queryInterface.createTable('Vehicle', {
//       id: {
//         type: Sequelize.DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false
//       },
//       model: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//       },
//       make: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//       },
//       location: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//       },
//       price: {
//         type: Sequelize.DataTypes.DECIMAL,
//         allowNull: false
//       },
//       yearOfManufactor: {
//         type: Sequelize.DataTypes.DATE,
//         allowNull: false
//       },
//       color: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//       },
//       vehicleType: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: true
//       },
//       condition: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//       },
//       transmission: {
//         type: Sequelize.DataTypes.ENUM,
//         values: ['Automatic', 'Manual'],
//         allowNull: false
//       },
//       engineSize: {
//         type: Sequelize.DataTypes.STRING,
//         allowNull: false
//       },
//       mileage: {
//         type: Sequelize.DataTypes.DECIMAL,
//         allowNull: false
//       },
//       foreignUsed: {
//         type: Sequelize.DataTypes.BOOLEAN,
//         allowNull: false
//       },
//       localUsed: {
//         type: Sequelize.DataTypes.BOOLEAN,
//         allowNull: false
//       },
//       additionalFeatures: {
//         type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
//         allowNull: true
//       },
//       userId: {
//         type: Sequelize.DataTypes.INTEGER,
//         references: {
//           model: {
//             tableName: 'User'
//           },
//           key: 'id'
//         },
//         allowNull: false
//       },
//     })
//   },
//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     return queryInterface.dropTable('Vehicle');
//   }
// };
