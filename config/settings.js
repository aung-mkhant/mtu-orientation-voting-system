let settings = {
  isVotingOpen: false,
}

module.exports = {
  getVotingStatus: () => settings.isVotingOpen,
  setVotingStatus: (status) => {
    settings.isVotingOpen = status
  },
}
