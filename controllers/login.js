const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

loginRouter.post('/', async(request,response,next) => {
    const { email, password } = request.body
   
    try {
        const user = await User.findOne({email})
        if (!user) {
            return response.status(401).json({error: 'invalid credentials'})
        }
        const isUserExists = await bcrypt.compare(password, user.passwordHash)
        if (!isUserExists) {
            return response.status(401).json({error: 'invalid credentials'})
        }

        const userObjectForToken = {
            email: user.email,
            id: user.id,
            firstName: user.firstName
        }

        const token = jwt.sign(userObjectForToken, process.env.SECRET)
        
        response.status(201).json({email, firstName: user.firstName, token})
    } catch (error) {
        next(error)
    }
})

module.exports = loginRouter