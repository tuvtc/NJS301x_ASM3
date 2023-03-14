const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    fullName: {
        type: String,
        required: 'Full Name is required'

    },
    phoneNumber: {
        type: String, 
        required: 'Phone Number is required'
    },
    role: {
        type: String,
        default: 'user'
    }
})

userSchema.pre('save', async function(next) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
})

userSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const Users = mongoose.model('users', userSchema)
module.exports = Users