import { eq } from 'drizzle-orm'
import { admins } from '../db/schema.js'
import db from '../db/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

export const authenticateAdmin = async (username: string, password: string) => {
  const admin = await getAdminByUsername(username)
  if (!admin) return null
  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch) return null
  const token = jwt.sign({ userId: admin.id }, JWT_SECRET!, {
    expiresIn: '1h',
  })
  return { admin, token }
}

export const getAdminByUsername = async (username: string) => {
  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username))
    .limit(1)
  return admin
}
