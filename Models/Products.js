const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: 'category is required'
    },
    img1: {
        type: String,
    },
    img2: {
        type: String,
    },
    img3: {
        type: String, 
    },
    img4: {
        type: String,
    },
    long_desc: {
        type: String,
        required: 'Long description is required'
    },
    name: {
        type: String,
        required: 'Product name is required'
    },
    price: {
        type: Number, 
        required: 'Price is required'
    },
    short_desc: {
        type: String,
        required: 'Short description is required'
    }
})

const Products = mongoose.model('products', productSchema)
module.exports = Products