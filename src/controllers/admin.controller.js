const { Vote, Candidate } = require("../models")

const createCandidate = async (req, res) => {
  const { number, gender } = req.body
  try {
    const candidate = await Candidate.create()
    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(400).json({ error: "User already exists" })
  }
}

const getKingCandidate = async (req, res) => {
  return
}
const getQueenCandidate = (req, res) => {
  return
}
const getPopularCandidate = (req, res) => {
  return
}
const getStyleCandidate = (req, res) => {
  return
}
const getSmartCandidate = (req, res) => {
  return
}
module.exports = {
  createCandidate,
  getKingCandidate,
  getQueenCandidate,
  getPopularCandidate,
  getStyleCandidate,
  getSmartCandidate,
}
