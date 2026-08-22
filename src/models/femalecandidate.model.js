"use strict"
const { Model } = require("sequelize")
const baseCandidateAttributes = require("./baseCandidateAttributes")

module.exports = (sequelize, DataTypes) => {
  class FemaleCandidate extends Model {
    static associate(models) {
      FemaleCandidate.hasMany(models.Vote, {
        foreignKey: "queen_candidate_number",
        sourceKey: "number",
        as: "queenVotes",
      })
      FemaleCandidate.hasMany(models.Vote, {
        foreignKey: "style_candidate_number",
        sourceKey: "number",
        as: "styleVotes",
      })
      FemaleCandidate.hasMany(models.Vote, {
        foreignKey: "popular_female_candidate_number",
        sourceKey: "number",
        as: "popularFemaleVotes",
      })
    }
  }

  FemaleCandidate.init(
    {
      ...baseCandidateAttributes(DataTypes),
    },
    {
      sequelize,
      modelName: "FemaleCandidate",
      tableName: "female_candidates",
    },
  )

  return FemaleCandidate
}
