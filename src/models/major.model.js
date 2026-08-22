"use strict"
const { Model } = require("sequelize")
const majors = ["CEIT"]

module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Major.init(
    {
      full_name: {
        type: DataTypes.ENUM("CEIT"),
      },
      short_name: {
        type: DataTypes.ENUM(""),
      },
    },
    {
      sequelize,
      modelName: "Major",
    },
  )
  return Major
}
