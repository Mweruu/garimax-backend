const bycrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        mobile: 0714151444,
        password: bycrypt.hashSync('1234567', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Jon',
        lastName: 'Die',
        mobile: 0715425667,
        password: bycrypt.hashSync('1234567', 10),
        email: 'jondoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};