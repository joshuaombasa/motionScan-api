const scannersRouter = require('express').Router()
const Scanner = require('../models/scanner')

scannersRouter.get('/', async (request, response, next) => {
    try {
        const scanners = await Scanner.find({})
        response.json(scanners)
    } catch (error) {
        next(error)
    }
})

scannersRouter.get('/:id', async (request, response, next) => {
    try {
        const scanner = await Scanner.findById(request.params.id)
        response.json(scanner)
    } catch (error) {
        next(error)
    }
})

scannersRouter.post('/', async (request, response, next) => {
    const { hospitalName, status, price, imageUrl, description } = request.body
    const scannerObject = new Scanner({ name: hospitalName, status, price, imageUrl, description })
    try {
        
        const savedScanner = await scannerObject.save()
   
        response.status(201).json(savedScanner.toJSON())
    } catch (error) {
        next(error)
    }
})

// scannersRouter.get('/', async (request,response,next) => {
//     try {
//         const scanners = await Scanner.find({})
//         response.json(scanners)
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = scannersRouter
