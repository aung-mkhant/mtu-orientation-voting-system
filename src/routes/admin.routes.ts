import express, { type Request, type Response } from 'express'
import { adminLogin } from '../controllers/admin.controller.js'
import { votes } from '../db/schema.js'
import authenticateToken from '../middlewares/auth.middlware.js'
import { getVotes } from '../services/votes.services.js'
import {
  getAllNomineesWithVotes,
  getNomineeWithVotesByTitle,
} from '../services/nominees.services.js'

const router = express.Router()

export const categoryMap = Object.freeze({
  king: votes.kingNomineeId,
  queen: votes.queenNomineeId,
  smart: votes.smartNomineeId,
  style: votes.styleNomineeId,
  popular: votes.popularNomineeId,
})
router.get('/login', (_req: Request, res: Response) => {
  res.render('pages/admin/login')
})
router.post('/login', adminLogin)

router.use(authenticateToken)

router.get('/dashboard', async (_req: Request, res: Response) => {
  const votes = await getVotes()
  return res.render('pages/admin/dashboard', {
    votes,
  })
})
router.get('/nominees', async (_req: Request, res: Response) => {
  const nominees = await getAllNomineesWithVotes()
  return res.render('pages/admin/nominees/', {
    nominees,
  })
})
router.get('/nominees/new', async (_req: Request, res: Response) => {
  return res.render('pages/admin/nominees/new')
})
router.post('/nominees', (req: Request, res: Response) => {
  const { name } = req.body
  return
})

router.get('/results/:category', async (req: Request, res: Response) => {
  const { category } = req.params as { category: keyof typeof categoryMap }
  console.log('category is', category)
  const nominees = await getNomineeWithVotesByTitle(categoryMap[category])
  console.log(nominees)
  return res.render('pages/admin/results', {
    nominees,
  })
})
export default router
