import { eq, sql, or } from 'drizzle-orm'
import db from '../db/index.js'
import { nominees, NomineeTitle, votes } from '../db/schema.js'

export const getNominees = async () => {
  const nominees = await db.query.nominees.findMany({
    with: {
      major: true,
    },
  })
  return nominees
}

export const getNomineesWithVotes = async () => {
  const nomineesWithVotes = await db
    .select({
      id: nominees.id,
      name: nominees.name,
      number: nominees.number,
      gender: nominees.gender,
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
export const updateNomineeTitleById = async (
  id: number,
  title: NomineeTitle,
) => {
  const [updatedNominee] = await db
    .update(nominees)
    .set({ title })
    .where(eq(nominees.id, id))
    .returning()
  return updatedNominee
}
