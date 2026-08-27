import { count, desc, eq } from 'drizzle-orm'
import { nominees, votes } from '../db/schema.js'
import db from '../db/index.js'
import type { PgColumn } from 'drizzle-orm/pg-core'

export const getVotesByCategory = async (categoryColumn: PgColumn) => {
  const kingVotes = await db
    .select({
      nomineeId: nominees.id,
      nomineeName: nominees.name,
      nomineeNumber: nominees.number,
      totalVotes: count(categoryColumn),
    })
    .from(votes)
    .innerJoin(nominees, eq(categoryColumn, nominees.id))
    .groupBy(categoryColumn, nominees.id, nominees.number)
    .orderBy(desc(count(categoryColumn)))
  return kingVotes
}
