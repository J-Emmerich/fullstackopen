const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const uri = process.env.MONGODB_URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(uri, options)
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongoose')
})
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from Mongoose')
})
process.on('SIGINT', () => {
  mongoose.connection.close(console.log('Closing DB'))
  process.exit()
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: { type: String, required: true, minLength: 8 },
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
