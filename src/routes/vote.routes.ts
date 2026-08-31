import express, { type Request, type Response } from 'express'
import checkVotingStatus from '../middlewares/vote.middleware.js'
import { postVotes } from '../controllers/vote.controller.js'
const router = express.Router()

router.post('/', checkVotingStatus, postVotes)

// router.get('/:category', async (req: Request, res: Response) => {
//   const category = req.params.category
//   const categoryVotes = await getVotesByCategory(category)
// })

export default router
