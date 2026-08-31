import express, { type Request, type Response } from 'express'
import {
  adminLogin,
  handleNomineeCreation,
  renderDashboard,
  renderNomineeCreationForm,
  renderNomineesWithVotes,
  renderResultsByCategory,
} from '../controllers/admin.controller.js'
import authenticateToken from '../middlewares/auth.middlware.js'

const router = express.Router()

router.get('/login', (_req: Request, res: Response) => {
  res.render('pages/admin/login')
})
router.post('/login', adminLogin)

router.use(authenticateToken)

router.get('/dashboard', renderDashboard)
router.get('/nominees', renderNomineesWithVotes)
router.get('/nominees/new', renderNomineeCreationForm)
router.post('/nominees', handleNomineeCreation)

router.get('/results/:category', renderResultsByCategory)
export default router
