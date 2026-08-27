import express, { type Request, type Response } from 'express'
const router = express.Router()
import { renderNomineesPage } from '../controllers/nominee.controller.js'

router.get('/', renderNomineesPage)

export default router
