const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    fullName: {
        type: String,
        required: 'Full Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'

    },
    phone: {
        type: String, 
        required: 'Phone Number is required'
    },
    address: {
        type: String,
        required: 'Address is required'
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: 'Product id is required',
            },
            quantity: {
                type: Number,
                required: 'Quantity is required',
            },
            price: {
                type: Number,
                required: 'Price is required',
            },
        }
    ],
    totalBill: {
        type: Number,
        required: 'Total Bill is required'
    },
    payingStatus: {
        type: Number,
        default: 0
    },
    deliveryStatus: {
        type: Number,
        default: 0
    }
})

const Orders = mongoose.model('orders', orderSchema)
module.exports = Orders