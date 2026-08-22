const { Admin } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config/config")

const logIn = async (req, res) => {
  const { username, password } = req.body
  console.log("values are ", username, password)
  try {
    const admin = await Admin.findOne({
      where: {
        username,
      },
    })
    if (!admin)
      return res.status(401).render("pages/auth", {
        error: "Invalid username or password",
      })

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch)
      return res.status(401).render("pages/auth", {
        error: "Invalid username or password",
      })
    const token = jwt.sign({ userId: admin.id }, JWT_SECRET, {
      expiresIn: "1h",
    })
    res.cookie("token", token, { httpOnly: true })
    return res.redirect("/admin/dashboard")
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
}
module.exports = { logIn }
