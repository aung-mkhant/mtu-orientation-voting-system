"use strict"
const { Model } = require("sequelize")
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Admin",
      hooks: {
        beforeBulkCreate: (admins) => {
          admins.forEach(async (admin) => {
            admin.password = await bcrypt.hash(admin.password, 10)
          })
        },
      },
    },
  )
  return Admin
}
