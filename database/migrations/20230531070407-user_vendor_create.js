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
//     return queryInterface.createTable('User', {
//       firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       lastName: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       mobile: {
//         type: Sequelize.BIGINT,
//         allowNull: false
//       },
//       passwordHash: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       isAdmin: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//       }
//     })
//     .then(() => {
//       return queryInterface.createTable('SingleVendor', {
//         passportNo: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         gender: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         isVendor: {
//           type: Sequelize.BOOLEAN,
//           defaultValue: true
//         }
//       }) 
//     })
//     .then(() => {
//       return queryInterface.createTable('CopVendor', {
//         companyName: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         kraPin: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         dealerLicense: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         address: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         location: {
//           type: Sequelize.STRING,
//           allowNull: false
//         },
//         isVendor: {
//           type: Sequelize.BOOLEAN,
//           defaultValue: true
//         }
//       }) 
//     })
//     ;
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     return queryInterface.dropTable('User')
//       .then(() => {
//         return queryInterface.dropTable('SingleVendor') 
//       })
//         .then(() => {
//           return queryInterface.dropTable('CopVendor') 
//         });
//   }
// };
