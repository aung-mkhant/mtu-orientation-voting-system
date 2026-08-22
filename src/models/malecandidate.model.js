"use strict"
const { Model } = require("sequelize")
const baseCandidateAttributes = require("./baseCandidateAttributes")

module.exports = (sequelize, DataTypes) => {
  class MaleCandidate extends Model {
    static associate(models) {
      MaleCandidate.hasMany(models.Vote, {
        foreignKey: "king_candidate_number",
        sourceKey: "number",
        as: "kingVotes",
      })
      MaleCandidate.hasMany(models.Vote, {
        foreignKey: "smart_candidate_number",
        sourceKey: "number",
        as: "smartVotes",
      })
      MaleCandidate.hasMany(models.Vote, {
        foreignKey: "popular_male_candidate_number",
        sourceKey: "number",
        as: "popularMaleVotes",
      })
    }
  }

  MaleCandidate.init(
    {
      ...baseCandidateAttributes(DataTypes),
    },
    {
      sequelize,
      modelName: "MaleCandidate",
      tableName: "male_candidates",
    },
  )

  return MaleCandidate
}
