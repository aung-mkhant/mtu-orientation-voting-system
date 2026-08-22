const express = require("express")
const router = express.Router()
const auth = require("../middlewares/auth.middlware")
const { logIn } = require("../controllers/auth.controller")

router.use(auth)

router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard")
})
router.post("/create", () => {
  return
})

module.exports = router
