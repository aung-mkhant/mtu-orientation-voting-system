const express = require("express")
const router = express.Router()

const authRoutes = require("./auth.routes.js")
const adminRoutes = require("./admin.routes.js")
const userRoutes = require("./user.routes.js")

router.use("/auth", authRoutes)
router.use("/admin", adminRoutes)
router.use("/", userRoutes)

module.exports = router
