"use strict"
const bcrypt = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10)

    await queryInterface.bulkInsert("admins", [
      {
        username: "admin",
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {})
  },
}
