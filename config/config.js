const { loadEnvFile } = require("node:process")
loadEnvFile()
const fs = require("fs")

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  JWT_SECRET: process.env.JWT_SECRET,
}
