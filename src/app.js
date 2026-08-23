const express = require("express")
const ejs = require("ejs")
const path = require("path")
const { rateLimit } = require("express-rate-limit")
const cookieParser = require("cookie-parser")
const routes = require("./routes")

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.json())

app.use("/", routes)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong")
})

module.exports = app
