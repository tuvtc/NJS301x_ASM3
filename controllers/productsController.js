const Products = require('../Models/Products')

module.exports.getProducts = async (req, res) => {
  const products = await Products.find()
  res.json(products)
}

module.exports.getProductsRating = async (req, res) => {
  const productsRating = await Products
    .find()
    .limit(8)
  res.json(productsRating)
}

module.exports.getProductById = async (req, res) => {
  const productId = req.params.id
  try {
    const product = await Products.findById(productId)
    if (product) {
      const relatedProducts = await Products.find({ category: product.category, _id: { $ne: productId } })
      res.json({
        product,
        relatedProducts
      })
    } else (
      res.status(404).json({
        message: 'Khong tim thay id san pham'
      })
    )
  } catch {
    res.status(404).json({
      message: 'Khong tim thay id san pham'
    })
  }
}

