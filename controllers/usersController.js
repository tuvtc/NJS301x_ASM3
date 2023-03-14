const Users = require('../Models/Users')
const { createToken } = require('../jwt/token')

module.exports.signup = async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body

  //B1: valid thong tin
  if (!email || !password || !fullName || !phoneNumber) {
    return res.status(400).json(
      {
        message: 'Chua nhap du du lieu'
      }
    )
  }
  // B2: Xu ly logic
  // B2.1: Check user co ton tai trong db hay chua
  const foundUser = await Users.findOne({ email }).exec()

  if (foundUser) {
    return res.status(400).json(
      {
        message: 'User da ton tai voi email nay'
      }
    )
  }
  // B2.2: Tao user 
  try {
    const newUser = new Users(req.body)
    await newUser.save()
    // B3: Tra res
    res.json(
      {
        user: newUser,
        message: 'Dang ky thanh cong'
      }
    )
  } catch(e) {
    res.status(400).json({
      message: e.message.split(', ').map((msg, index) => msg.split(':')[!index ? 2 : 1])
    })
  }


}


module.exports.login = async (req, res) => {
  const {email, password} = req.body
  // B1: valid du lieu
  if (!email || !password) {
    return res.status(400).json(
      {
        message: 'Chua nhap email hoac password'
      }
    )
  }
  // B2: Xu ly logic
  // B2.1: user da ton tai chua
  const foundUser = await Users.findOne({ email }).exec()

  if (!foundUser) {
    return res.status(400).json(
      {
        message: 'User chua duoc dang ky'
      }
    )
  }
  // B2.2: Dung password khong
  const isMatchPassword = await foundUser.checkPassword(password)
  if (!isMatchPassword) {
    return res.status(400).json(
      { 
        message: 'Sai mat khau'
      }
    )
  }
  // B3: Tra token
  const token = createToken({id: foundUser._id, role: foundUser.role})

  res.json(
    {
      user: foundUser,
      token
    }
  )
}
