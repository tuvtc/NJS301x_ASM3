const Orders = require('../Models/Orders')
const { sendOrderCreatedSuccessEmail } = require('../mail')

module.exports.getOrders = async (req, res) => {
  const orders = await Orders.find({ user: req.user.id})
  res.json(orders)
}

module.exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Orders({...req.body, user: req.user.id})
    await newOrder.save()
    await newOrder.populate('products.product')

    // Gui mail cho user
    const emailPreviewLink = await sendOrderCreatedSuccessEmail(newOrder)

    res.json({ 
      newOrder,
      emailPreviewLink
    }) 
  } catch (e) {
    res.status(400).json({
      message: e.message.split(', ').map((msg, index) => msg.split(':')[!index ? 2 : 1]),
    })
  }
}

module.exports.getOrderById = async (req, res) => {
  const orderId = req.params.id
  try {
    const order = await Orders.findOne({ user: req.user.id, _id: orderId}).populate('products.product')
    if (order) {
      res.json(order)
    } else {
      res.status(404).json(
        {
          message: 'Khong kiem thay order'
        }
      )
    }
  } catch (e) {
    console.log(e.message)
  }
}


