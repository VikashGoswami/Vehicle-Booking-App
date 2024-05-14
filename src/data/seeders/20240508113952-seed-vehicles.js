"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vehicles', [
      {
          modelName: 'Honda Civic',
          vehicleTypeId: 1, // Assuming 1 is the ID of a hatchback type
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
          modelName: 'Toyota RAV4',
          vehicleTypeId: 2, // Assuming 2 is the ID of an SUV type
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
          modelName: 'Harley Davidson',
          vehicleTypeId: 3, // Assuming 3 is the ID of a cruiser type
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      // Add more vehicles as needed
  ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};
