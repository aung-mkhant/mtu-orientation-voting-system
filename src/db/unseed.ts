import { sql } from 'drizzle-orm/sql'
import db from './index.js'

const main = async () => {
  await db.execute(
    sql`TRUNCATE TABLE "votes", "nominees", "admins" RESTART IDENTITY CASCADE;`,
  )
  console.log('Tables wiped')
}
main()
