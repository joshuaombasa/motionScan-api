const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


const scannersRouter = require('./controllers/scanners')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URI)
     .then(() => logger.info(`connected to mongodb`))
     .catch(error => logger.error(error.message))

app.use(express.json())
app.use(cors())

app.use(middleware.requestLogger)

app.use('/api/scanners', scannersRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpointHandler)
app.use(middleware.errorHandler)

module.exports = app