import { loadEnvFile } from 'node:process'
loadEnvFile()

export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME = process.env.DB_NAME
export const DB_PORT = process.env.DB_PORT
export const DB_HOST = process.env.DB_HOST
export const JWT_SECRET = process.env.JWT_SECRET
export const DB_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
export const STATIC_URL = process.env.STATIC_URL
