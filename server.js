const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const port = 3000

const scannersRouter = require('./controllers/scanners')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URI)
     .then(() => logger.info(`connected to mongodb`))
     .catch(error => logger.error(error.message))

app.use(cors())
app.use(express.json())

app.use('/api/scanners', scannersRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const user = { email: "joshuaombasa@gmail.com", password: 'yd3FLBxZkdDkFLv' }



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})