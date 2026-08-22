const app = require("./src/app")
const { sequelize } = require("./src/models")
const { PORT } = require("./config/config")

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connected!")
    await sequelize.sync({ alter: true })
    console.log("Database synced successfully.")
    app.listen(PORT || 3000, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Unable to connect to database:", error)
  }
}
startServer()
