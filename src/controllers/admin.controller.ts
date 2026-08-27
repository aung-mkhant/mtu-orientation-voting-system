import type { Request, Response } from 'express'
import { authenticateAdmin } from '../services/admin.services.js'

export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const authResult = await authenticateAdmin(username, password)
  if (!authResult) {
    return res.status(401).render('pages/login', {
      error: 'Invalid username or password',
    })
  }
  res.cookie('token', authResult.token, { httpOnly: true })
  return res.redirect('/admin/dashboard')
}
