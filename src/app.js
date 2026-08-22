const express = require("express")
const ejs = require("ejs")
const path = require("path")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes.js")
const adminRoutes = require("./routes/admin.routes.js")
const userRoutes = require("./routes/user.routes.js")

const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)
app.use("/", userRoutes)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong")
})
module.exports = app
