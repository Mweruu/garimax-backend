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

//       return queryInterface.addColumn(
//         'SingleVendor', // name of Target model
//         'userId', // name of the key we're adding
//         {
//           type: Sequelize.DataTypes.INTEGER,
//           references: {
//             model: {
//               tableName: 'User'
//             }, // name of Source model
//             key: 'id',
//           },
//           onUpdate: 'CASCADE',
//           onDelete: 'SET NULL',
//         }
//       )
//       .then(() => {
//         return queryInterface.addColumn(
//           'CopVendor', // name of Target model
//           'userId', // name of the key we're adding
//           {
//             type: Sequelize.DataTypes.INTEGER,
//             references: {
//               model: {
//                 tableName: 'User'
//               }, // name of Source model
//               key: 'id',
//             },
//             onUpdate: 'CASCADE',
//             onDelete: 'SET NULL',
//           }
//         );
//       });
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//       return queryInterface.removeColumn(
//         'SingleVendor', // name of the Target model
//         'userId' // key we want to remove
//       )
//       .then(() => {
//         return queryInterface.removeColumn(
//           'CopVendor', // name of the Target model
//           'userId' // key we want to remove
//         );
//       });
//   }
// };
