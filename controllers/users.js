const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)
        response.json(user)
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { email, password, firstName, lastName, phoneNumber } = request.body


    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const userObject = new User({ email, passwordHash, firstName, lastName, phoneNumber })
        const savedUser = await userObject.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

// usersRouter.get('/', async (request,response,next) => {
//     try {
//         const users = await User.find({})
//         response.json(users)
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = usersRouter