import express, { type Request, type Response } from 'express'
import adminRoutes from './admin.routes.js'
import nomineeRoutes from './nominee.routes.js'
import voteRoutes from './vote.routes.js'

const router = express.Router()

router.use('/admin', adminRoutes)
router.use('/votes', voteRoutes)
router.use('/nominees', nomineeRoutes)

export default router
