process.stdin.resume()
const mongoose = require('mongoose')

const user = 'admin'
const password = process.argv[2]
const uri = `mongodb+srv://${user}:${password}@base.b4wyc.mongodb.net/Base?retryWrites=true&w=majority`
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}



mongoose.connect(uri, options)
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongoose')
  run()
})
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from Mongoose')
})
process.on('SIGINT', () => {
  mongoose.connection.close(console.log('Closing DB'))
  process.exit()
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

console.log('this is Person', Person)

async function run() {

  if(process.argv[3] !== undefined){
    const name = process.argv[3]
    const number = process.argv[4]
    const newPerson = new Person({ name, number })
    console.log(newPerson)
    await newPerson.save()
    mongoose.connection.close()


  } else {
    console.log('runnnnnn')
    await  Person.find({}).then(data => console.log(data))
    mongoose.connection.close()
  }
}





module.exports = mongoose
