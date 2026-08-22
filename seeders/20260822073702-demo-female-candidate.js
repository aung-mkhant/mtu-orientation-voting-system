"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("female_candidates", [
      {
        number: 1,
        name: "Sophia Brown",
        gender: "Female",
        major: "Information Technology",
        description: "UI/UX designer and student council representative.",
        image_path: "1.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 2,
        name: "Olivia Davis",
        gender: "Female",
        major: "Mechanical Engineering",
        description: "Automotive research group lead and badminton champion.",
        image_path: "2.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        number: 3,
        name: "Emma Wilson",
        gender: "Female",
        major: "Architecture",
        description:
          "Sustainable design advocate and campus art gallery organizer.",
        image_path: "3.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("female_candidates", null, {})
  },
}
