import { sql } from 'drizzle-orm'
import db from './db/index.js'

import app from './app.js'
import { PORT } from './config/config.js'

const main = async () => {
  try {
    await db.execute(sql`SELECT 1`)
    console.log('Database connected successfully')
    app.listen(PORT || 3000, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to database:', error)
  }
}
main()
