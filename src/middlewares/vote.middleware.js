const { getVotingStatus } = require("../../config/settings")

const checkVotingStatus = (req, res, next) => {
  res.locals.isVotingOpen = getVotingStatus()
  next()
}
module.exports = checkVotingStatus
