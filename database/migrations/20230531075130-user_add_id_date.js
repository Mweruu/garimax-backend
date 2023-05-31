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
//     return queryInterface.addColumn(
//       'User', // name of Source model
//       'id', // name of the key we're adding 
//       {
//         type: Sequelize.DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         unique: true,
//         allowNull: false
//       })
//       .then(() => {
//           return queryInterface.addColumn(
//             'User', // name of Target model
//             'createdAt', // name of the key we're adding
//             { type: Sequelize.DataTypes.DATE }
//           );
//         })
//         .then(() => {
//           return queryInterface.addColumn(
//             'User', // name of Target model
//             'updatedAt', // name of the key we're adding
//             { type: Sequelize.DataTypes.DATE }
//           );
//         });
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     return queryInterface.removeColumn(
//       'User', // name of Source model
//       'id' // key we want to remove
//     )
//     .then(() => {
//         return queryInterface.removeColumn(
//           'User',
//           'createdAt'
//         )
//       })
//       .then(() => {
//         return queryInterface.removeColumn(
//           'User',
//           'updatedAt'
//         )
//       });
//   }
// };
