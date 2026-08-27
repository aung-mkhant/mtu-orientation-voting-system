let settings = {
  isVotingOpen: false,
}

export const getVotingStatus = (): boolean => settings.isVotingOpen

export const setVotingStatus = (status: boolean): void => {
  settings.isVotingOpen = status
}
