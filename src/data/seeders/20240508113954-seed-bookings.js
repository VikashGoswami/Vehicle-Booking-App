"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Bookings", [
      {
        name: "John Doe",
        vehicleId: 1, // Assuming 1 is the ID of an existing vehicle
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-05-05"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        vehicleId: 2, // Assuming 2 is the ID of another existing vehicle
        startDate: new Date("2024-05-10"),
        endDate: new Date("2024-05-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more bookings as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};
