import db from '../db/index.js'

export const getVotes = async () => {
  const votes = await db.query.votes.findMany({
    columns: {
      kingNomineeId: false,
      queenNomineeId: false,
      smartNomineeId: false,
      styleNomineeId: false,
      popularNomineeId: false,
      updatedAt: false,
      deletedAt: false,
    },
    with: {
      kingNominee: true,
      queenNominee: true,
      smartNominee: true,
      styleNominee: true,
      popularNominee: true,
    },
  })
  return votes
}
