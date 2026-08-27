import { drizzle } from 'drizzle-orm/node-postgres'
import { DB_URL, NODE_ENV } from '../config/config.js'
import relations from './relations.js'

// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    connectionString: DB_URL!,
    ssl: NODE_ENV === 'production' ? true : false,
  },
  relations,
})
export default db
