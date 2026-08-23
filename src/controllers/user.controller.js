const { Vote, MaleCandidate, FemaleCandidate } = require("../models")

const getCandidates = async (req, res) => {
  const code = req.query?.code
  const [maleCandidates, femaleCandidates] = await Promise.all([
    MaleCandidate.findAll({ order: [["number", "ASC"]] }),
    FemaleCandidate.findAll({ order: [["number", "ASC"]] }),
  ])
  // res.json(candidates)
  res.render("pages/index", {
    maleCandidates,
    femaleCandidates,
    code,
  })
}
const postVotes = async (req, res) => {
  const { code, king, queen, smart, style, popular_male, popular_female } =
    req.body

  const hasPopularMale = Boolean(popular_male)
  const hasPopularFemale = Boolean(popular_female)

  if (
    (hasPopularMale && hasPopularFemale) ||
    (!hasPopularMale && !hasPopularFemale)
  ) {
    return res.status(400).json({
      error:
        "Please vote for exactly one Popular candidate (either male or female).",
    })
  }
  try {
    const newVote = await Vote.create({
      id: code || null,
      king_candidate_number: king || null,
      queen_candidate_number: queen || null,
      smart_candidate_number: smart || null,
      style_candidate_number: style || null,
      popular_male_candidate_number: popular_male || null,
      popular_female_candidate_number: popular_female || null,
    })

    return res.status(201).json({
      message: "Vote recorded successfully!",
      vote: newVote,
    })
  } catch (error) {
    console.error("Error submitting vote:", error)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getCandidates,
  postVotes,
}
