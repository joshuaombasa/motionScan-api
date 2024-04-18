const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const scannerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
})

scannerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Scanner', scannerSchema)