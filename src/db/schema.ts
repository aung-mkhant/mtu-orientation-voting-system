import { snakeCase, pgEnum } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'

const timestamps = {
  updatedAt: t.timestamp(),
  createdAt: t.timestamp().defaultNow().notNull(),
  deletedAt: t.timestamp(),
}
export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any
}
export enum Major {
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
export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
export enum Title {
  King = 'King',
  Queen = 'Queen',
  Smart = 'Smart',
  Style = 'Style',
  Popular = 'Popular',
}
export const majorEnum = pgEnum('name', enumToPgEnum(Major))
export const titleEnum = pgEnum('title', enumToPgEnum(Title))
export const genderEnum = pgEnum('gender', enumToPgEnum(Gender))

export const admins = snakeCase.table('admins', {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  username: t.varchar({ length: 255 }).notNull().unique(),
  password: t.varchar().notNull(),
  ...timestamps,
})
export const nominees = snakeCase.table('nominees', {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
  number: t.integer().notNull(),
  gender: genderEnum(),
  title: titleEnum(),
  major: majorEnum(),
  ...timestamps,
})
export const votes = snakeCase.table('votes', {
  id: t.uuid().primaryKey(),
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
