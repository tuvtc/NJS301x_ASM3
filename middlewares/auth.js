const { verifyToken } = require('../jwt/token')

const authGuardCheck = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      message: 'Unauthorize'
    })
  }

  const token = authorization.split(' ')[1]

  try {
    const data = verifyToken(token)
    req.user = data
  } catch (e) {
    return res.status(401).json({
      message: e.message
    })
  }

  next()
}

module.exports = authGuardCheck