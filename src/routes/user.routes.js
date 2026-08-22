const express = require("express")
const { getCandidates, postVotes } = require("../controllers/user.controller")
const checkVotingStatus = require("../middlewares/vote.middleware")
const router = express.Router()

router.use(checkVotingStatus)
router.get("/", getCandidates)
router.post("/", postVotes)

module.exports = router
