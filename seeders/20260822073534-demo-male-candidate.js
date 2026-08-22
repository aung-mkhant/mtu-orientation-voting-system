"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("male_candidates", [
      {
        number: 1,
        name: "Ethan Smith",
        gender: "Male",
        major: "Computer Engineering & Information Technology",
        description:
          "Enthusiastic developer and tech lead for the annual hackathon.",
        image_path: "1.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 2,
        name: "Liam Johnson",
        gender: "Male",
        major: "Electrical Power Engineering",
        description:
          "Robotics club lead passionate about renewable energy projects.",
        image_path: "2.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 3,
        name: "Noah Williams",
        gender: "Male",
        major: "Civil Engineering",
        description:
          "Campus basketball team captain and structural engineering enthusiast.",
        image_path: "3.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("male_candidates", null, {})
  },
}
