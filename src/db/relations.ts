import { defineRelations } from 'drizzle-orm'
import { admins, nominees, votes } from './schema.js'

const relations = defineRelations({ admins, nominees, votes }, (r) => ({
  votes: {
    kingNominee: r.one.nominees({
      from: r.votes.kingNomineeId,
      to: r.nominees.id,
    }),
    queenNominee: r.one.nominees({
      from: r.votes.queenNomineeId,
      to: r.nominees.id,
    }),
    smartNominee: r.one.nominees({
      from: r.votes.smartNomineeId,
      to: r.nominees.id,
    }),
    styleNominee: r.one.nominees({
      from: r.votes.styleNomineeId,
      to: r.nominees.id,
    }),
    popularNominee: r.one.nominees({
      from: r.votes.popularNomineeId,
      to: r.nominees.id,
    }),
  },
}))

export default relations
