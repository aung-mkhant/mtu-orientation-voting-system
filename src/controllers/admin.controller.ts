import type { Request, Response } from 'express'
import { authenticateAdmin } from '../services/admin.services.js'
import { getVotes } from '../services/votes.services.js'
import {
  getAllNomineesWithVotes,
  getNomineeWithVotesByTitle,
} from '../services/nominees.services.js'
import { votes } from '../db/schema.js'

export const categoryMap = Object.freeze({
  king: votes.kingNomineeId,
  queen: votes.queenNomineeId,
  smart: votes.smartNomineeId,
  style: votes.styleNomineeId,
  popular: votes.popularNomineeId,
})
export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const authResult = await authenticateAdmin(username, password)
  if (!authResult) {
    return res.status(401).render('pages/admin/login', {
      error: 'Invalid username or password',
    })
  }
  res.cookie('token', authResult.token, { httpOnly: true })
  return res.redirect('/admin/dashboard')
}
export const renderDashboard = async (_req: Request, res: Response) => {
  const votes = await getVotes()
  return res.render('pages/admin/dashboard', {
    votes,
    layout: '../views/layouts/admin.layout.ejs',
  })
}
export const renderNomineesWithVotes = async (_req: Request, res: Response) => {
  const nominees = await getAllNomineesWithVotes()
  return res.render('pages/admin/nominees/', {
    nominees,
  })
}

export const handleNomineeCreation = (req: Request, res: Response) => {
  const { name } = req.body
  return
}
export const renderNomineeCreationForm = async (
  _req: Request,
  res: Response,
) => {
  return res.render('pages/admin/nominees/new')
}
export const renderResultsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params as { category: keyof typeof categoryMap }
  const nominees = await getNomineeWithVotesByTitle(categoryMap[category])
  return res.render('pages/admin/results/', {
    nominees,
  })
}
