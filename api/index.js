const express = require('express')

const cors = require('cors')
const connectToDb = require('../db/database')
const usersRouter = require('../routes/users')
const productsRouter = require('../routes/products')
const ordersRouter = require('../routes/orders')
const authGuardCheck = require('../middlewares/auth')

connectToDb()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', authGuardCheck, ordersRouter)

// Khi ko deploy thi xoa comment line phia duoi de chay local
// app.listen(() => {console.log('Server is running in Vercel')})

// export de chay duoi dang severless tren Vercel khi deploy
module.exports = app;