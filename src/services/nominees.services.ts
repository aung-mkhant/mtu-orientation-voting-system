import { eq, sql, or, count, desc } from 'drizzle-orm'
import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import db from '../db/index.js'
import { nominees, Title, votes } from '../db/schema.js'
import { STATIC_URL } from '../config/config.js'

export const getNomineeImageUrl = (gender: string, number: number) => {
  const folder = gender.toLowerCase() === 'male' ? 'males' : 'females'
  return `${STATIC_URL}/${folder}/${number}.jpg`
}
export const withImagePath = (nominee: typeof nominees.$inferSelect) => ({
  ...nominee,
  imagePath: nominee.gender
    ? getNomineeImageUrl(nominee.gender, nominee.number)
    : null,
})
export const getNominees = async () => {
  const nominees = await db.query.nominees.findMany()
  const nomineesWithImagePath = nominees.map((nominee) =>
    withImagePath(nominee),
  )
  return nomineesWithImagePath
}
export const getNomineeWithVotesByTitle = async (titleColumn: AnyPgColumn) => {
  const result = await db
    .select({
      nominee: nominees,
      totalVotes: count(titleColumn),
    })
    .from(votes)
    .innerJoin(nominees, eq(titleColumn, nominees.id))
    .groupBy(titleColumn, nominees.id, nominees.number)
    .orderBy(desc(count(titleColumn)))

  return result.map(({ nominee, totalVotes }) => ({
    ...withImagePath(nominee),
    totalVotes,
  }))
}

export const getAllNomineesWithVotes = async () => {
  const nomineesWithVotes = await db
    .select({
      id: nominees.id,
      name: nominees.name,
      number: nominees.number,
      gender: nominees.gender,
      major: nominees.major,
      kingVotes: sql<number>`count(${votes.kingNomineeId})`,
      queenVotes: sql<number>`count(${votes.queenNomineeId})`,
      smartVotes: sql<number>`count(${votes.smartNomineeId})`,
      styleVotes: sql<number>`count(${votes.styleNomineeId})`,
      popularVotes: sql<number>`count(${votes.popularNomineeId})`,
    })
    .from(nominees)
    .leftJoin(
      votes,
      or(
        eq(nominees.id, votes.kingNomineeId),
        eq(nominees.id, votes.queenNomineeId),
        eq(nominees.id, votes.smartNomineeId),
        eq(nominees.id, votes.styleNomineeId),
        eq(nominees.id, votes.popularNomineeId),
      ),
    )
    .groupBy(nominees.id, nominees.name, nominees.number, nominees.gender)
  return nomineesWithVotes
}
export const updateNomineeTitleById = async (id: number, title: Title) => {
  const [updatedNominee] = await db
    .update(nominees)
    .set({ title })
    .where(eq(nominees.id, id))
    .returning()
  return updatedNominee
}
