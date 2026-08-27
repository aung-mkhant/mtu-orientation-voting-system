import { pgTable, pgEnum } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'

const timestamps = {
  updated_at: t.timestamp(),
  created_at: t.timestamp().defaultNow().notNull(),
  deleted_at: t.timestamp(),
}
export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any
}
export enum MajorName {
  CE = 'CE',
  Archi = 'Archi',
  ME = 'ME',
  CEIT = 'CEIT',
  EP = 'EP',
  EC = 'EC',
  ChE = 'ChE',
  MC = 'MC',
  BioT = 'Bio-T',
  Agri = 'Agri',
  NT = 'NT',
}

export enum NomineeTitle {
  King = 'King',
  Queen = 'Queen',
  Smart = 'Smart',
  Style = 'Style',
  Popular = 'Popular',
}
export const majorNameEnum = pgEnum('name', enumToPgEnum(MajorName))
export const nomineeTitleEnum = pgEnum('title', enumToPgEnum(NomineeTitle))

export const admins = pgTable('admins', {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  username: t.varchar({ length: 255 }).notNull().unique(),
  password: t.varchar().notNull(),
  ...timestamps,
})
export const majors = pgTable('majors', {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: majorNameEnum(),
  ...timestamps,
})
export const nominees = pgTable('nominees', {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
  number: t.integer().notNull(),
  gender: t.varchar().notNull(),
  title: nomineeTitleEnum(),
  majorId: t.integer('major_id').references(() => majors.id),
  ...timestamps,
})
export const votes = pgTable('votes', {
  id: t.integer().primaryKey(),
  kingNomineeId: t
    .integer('king_nominee_id')
    .references(() => nominees.id, { onDelete: 'cascade' }),
  queenNomineeId: t
    .integer('queen_nominee_id')
    .references(() => nominees.id, { onDelete: 'cascade' }),
  smartNomineeId: t
    .integer('smart_nominee_id')
    .references(() => nominees.id, { onDelete: 'cascade' }),
  styleNomineeId: t
    .integer('style_nominee_id')
    .references(() => nominees.id, { onDelete: 'cascade' }),
  popularNomineeId: t
    .integer('popular_nominee_id')
    .references(() => nominees.id, { onDelete: 'cascade' }),
  ...timestamps,
})
