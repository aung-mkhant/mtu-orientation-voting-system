import express from 'express'
const router = express.Router()
import { renderNominees } from '../controllers/nominee.controller.js'

router.get('/', renderNominees)

export default router
