const PASSWORD = 'Funix%40160922'
const DATABASE_NAME = 'ASM3'
const MONGO_CONNECT_URL = `mongodb+srv://tuvtc:${PASSWORD}@cluster0.fq04vsp.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`

const mongoose = require('mongoose')

const connectToDb = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(MONGO_CONNECT_URL)
        .then(() => console.log('Connected to database...!'))
        .catch((e) => {
            console.log('Unable to connect to database...')
            console.log('Error message: ', e.message)
            process.exit(1)
    })
}

module.exports = connectToDb
