module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        mobile: 0714151444,
        password: '1234567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Jon',
        lastName: 'Die',
        mobile: 0715425667,
        password: '1234567',
        email: 'jondoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};