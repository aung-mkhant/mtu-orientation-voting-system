const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config/config")

const auth = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.redirect("/auth/login")
  try {
    const decode = jwt.verify(token, JWT_SECRET)
    req.user = decode
    next()
  } catch {
    res.clearCookie("token")
    return res.redirect("/auth/login")
  }
}
module.exports = auth
