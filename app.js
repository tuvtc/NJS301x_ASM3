const express = require('express')
const cors = require('cors')
const connectToDb = require('./db/database')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const ordersRouter = require('./routes/orders')
const authGuardCheck = require('./middlewares/auth')

connectToDb()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/orders', authGuardCheck, ordersRouter)

app.listen(() => {console.log('Server is running in Vercel')})
