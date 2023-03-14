const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secrectKey'

module.exports.createToken = (data) => {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: "1d" })
  return token
}

module.exports.verifyToken = (token) => {
  const data = jwt.verify(token, SECRET_KEY)
  return data
}