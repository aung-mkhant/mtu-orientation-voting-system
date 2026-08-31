import db from './index.js'
import bcrypt from 'bcrypt'
import { admins, Gender, Major, nominees, votes } from './schema.js'

type Nominee = typeof nominees.$inferSelect

const getRandomNomineeIdByGender = (
  nomineeArray: Array<Nominee>,
  gender?: Gender,
) => {
  let randomNominee: Nominee
  let randomIndex: number
  const filterdNominees = gender
    ? nomineeArray.filter((n) => n.gender === gender)
    : nomineeArray
  randomIndex = Math.floor(Math.random() * filterdNominees.length)
  randomNominee = filterdNominees[randomIndex]!
  return randomNominee.id
}
function* uuidStream() {
  while (true) {
    yield crypto.randomUUID()
  }
}
const generateVoteSeeds = (
  nomineeArray: Array<Nominee>,
  count: number,
): (typeof votes.$inferInsert)[] => {
  const gen = uuidStream()
  return Array.from({ length: count }, () => ({
    id: gen.next().value!,
    kingNomineeId: getRandomNomineeIdByGender(nomineeArray, Gender.Male),
    queenNomineeId: getRandomNomineeIdByGender(nomineeArray, Gender.Female),
    smartNomineeId: getRandomNomineeIdByGender(nomineeArray, Gender.Male),
    styleNomineeId: getRandomNomineeIdByGender(nomineeArray, Gender.Female),
    popularNomineeId: getRandomNomineeIdByGender(nomineeArray),
  }))
}
const main = async () => {
  await db.transaction(async (tx) => {
    await tx
      .insert(admins)
      .values([{ username: 'admin', password: await bcrypt.hash('admin', 10) }])
    const insertedNominees = await tx
      .insert(nominees)
      .values([
        {
          name: 'Hnin Hnin',
          number: 1,
          gender: Gender.Female,
          major: Major.CEIT,
        },
        {
          name: 'Su Su',
          number: 2,
          gender: Gender.Female,
          major: Major.CE,
        },
        {
          name: 'May Thu',
          number: 3,
          gender: Gender.Female,
          major: Major.Archi,
        },
        {
          name: 'Aye Aye',
          number: 4,
          gender: Gender.Female,
          major: Major.EC,
        },
        {
          name: 'Thiri',
          number: 5,
          gender: Gender.Female,
          major: Major.ME,
        },

        // --- Male Nominees ---
        {
          name: 'Aung Aung',
          number: 1,
          gender: Gender.Male,
          major: Major.CEIT,
        },
        {
          name: 'Kyaw Kyaw',
          number: 2,
          gender: Gender.Male,
          major: Major.ME,
        },
        {
          name: 'Min Thu',
          number: 3,
          gender: Gender.Male,
          major: Major.EP,
        },
        {
          name: 'Zaw Zaw',
          number: 4,
          gender: Gender.Male,
          major: Major.ChE,
        },
        {
          name: 'Kaung Kaung',
          number: 5,
          gender: Gender.Male,
          major: Major.MC,
        },
      ])
      .returning()
    await tx.insert(votes).values(generateVoteSeeds(insertedNominees, 10))
  })
}
main()
