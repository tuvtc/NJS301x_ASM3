const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
})

const Sessions = mongoose.model('sessions', sessionSchema)
module.exports = Sessions