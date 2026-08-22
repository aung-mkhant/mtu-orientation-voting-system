"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.MaleCandidate, {
        foreignKey: "king_candidate_number",
        targetKey: "number",
        as: "kingCandidate",
      })
      Vote.belongsTo(models.MaleCandidate, {
        foreignKey: "smart_candidate_number",
        targetKey: "number",
        as: "smartCandidate",
      })
      Vote.belongsTo(models.MaleCandidate, {
        foreignKey: "popular_male_candidate_number",
        targetKey: "number",
        as: "popularMaleCandidate",
      })
      // Female categories
      Vote.belongsTo(models.FemaleCandidate, {
        foreignKey: "queen_candidate_number",
        targetKey: "number",
        as: "queenCandidate",
      })
      Vote.belongsTo(models.FemaleCandidate, {
        foreignKey: "style_candidate_number",
        targetKey: "number",
        as: "styleCandidate",
      })
      Vote.belongsTo(models.FemaleCandidate, {
        foreignKey: "popular_female_candidate_number",
        targetKey: "number",
        as: "popularFemaleCandidate",
      })
    }
  }
  Vote.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      king_candidate_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "male_candidates", key: "number" },
      },
      queen_candidate_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "female_candidates", key: "number" },
      },
      smart_candidate_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "male_candidates", key: "number" },
      },
      style_candidate_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "female_candidates", key: "number" },
      },
      popular_male_candidate_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "male_candidates", key: "number" },
      },
      popular_female_candidate_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "female_candidates", key: "number" },
      },
    },
    {
      sequelize,
      modelName: "Vote",
    },
  )
  return Vote
}
