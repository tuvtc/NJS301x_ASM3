const express = require('express')
const productsController = require('../controllers/productsController')

const router = express.Router()

router.get('/', productsController.getProducts)
router.get('/rating', productsController.getProductsRating)
router.get('/:id', productsController.getProductById)


module.exports = router