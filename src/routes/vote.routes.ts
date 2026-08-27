import express, { type Request, type Response } from 'express'
import checkVotingStatus from '../middlewares/vote.middleware.js'
import { postVotes } from '../controllers/vote.controller.js'
const router = express.Router()

router.post('/', checkVotingStatus, postVotes)
export default router
