import express, { type Request, type Response } from 'express'
import { adminLogin } from '../controllers/admin.controller.js'

import authenticateToken from '../middlewares/auth.middlware.js'
const router = express.Router()

router.get('/login', (_req: Request, res: Response) => {
  res.render('pages/login')
})
router.post('/login', adminLogin)

router.use(authenticateToken)

router.get('/dashboard', (_req: Request, res: Response) => {
  res.render('pages/dashboard')
})

router.get('/create', (_req: Request, res: Response) => {
  res.render('pages/create')
})

router.post('/create', (_req: Request, res: Response) => {
  res.render('pages/create')
})
export default router
