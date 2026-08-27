import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token
  if (!token) return res.redirect('/admin/login')
  try {
    const decode = jwt.verify(token, JWT_SECRET!)
    req.user = decode
    next()
  } catch {
    res.clearCookie('token')
    return res.redirect('/admin/login')
  }
}
export default authenticateToken
