const express = require('express')
const ordersController = require('../controllers/ordersController')

const router = express.Router()

router.get('/', ordersController.getOrders)
router.post('/', ordersController.createOrder)
router.get('/:id', ordersController.getOrderById)


module.exports = router