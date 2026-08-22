const fs = require("fs")
const { DB_USER, DB_NAME, DB_PORT, DB_PASSWORD, DB_HOST } = require("./config")

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST || "127.0.0.1",
    port: DB_PORT || 5432, // Default Postgres port
    dialect: "postgres",
    define: {
      underscored: true, // Auto-converts camelCase model fields to snake_case table columns
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME || "postgres",
    password: process.env.CI_DB_PASSWORD || null,
    database: process.env.CI_DB_NAME || "database_test",
    host: process.env.CI_DB_HOST || "127.0.0.1",
    port: process.env.CI_DB_PORT || 5432,
    dialect: "postgres",
    define: {
      underscored: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Set to true if providing a custom CA cert path below
        // ca: fs.readFileSync(__dirname + '/postgres-ca.crt'),
      },
    },
    define: {
      underscored: true,
    },
  },
}
