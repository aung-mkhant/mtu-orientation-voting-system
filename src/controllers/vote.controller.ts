import type { Request, Response } from 'express'
import { getVotesByCategory } from '../services/votes.services.js'
import { votes } from '../db/schema.js'

const categoryMap = Object.freeze({
  king: votes.kingNomineeId,
  queen: votes.queenNomineeId,
  smart: votes.smartNomineeId,
  style: votes.styleNomineeId,
  popular: votes.popularNomineeId,
})
export const getVotes = async (req: Request, res: Response) => {
  const { category } = req.query as { category: keyof typeof categoryMap }
  const kingVotes = await getVotesByCategory(categoryMap[category])
  return res.render('pages/dashboard', {
    votes: kingVotes,
  })
}
export const postVotes = async (req: Request, res: Response) => {}
