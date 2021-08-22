require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
const PORT = process.env.PORT || 3001

const errorHandler = async (error, req, res, next) => {
  console.error(error.message)

  try{

    if(error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
      return res.status(400).send(error.message)
    } else{

      next(error)
    }
  } catch (error) {
    console.log(error)
  }

}

morgan.token('postData', (req) => {
  if(req.method === 'POST'){
    return JSON.stringify( req.body)
  }
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))
app.get('/', (req, res) => {
  res.send('Hello')
})
app.get('/api/persons', async (req, res) => {
  try {
    const people = await Person.find({})
    console.log(people)
    res.status(200).send(people)
  } catch (error) {
    console.log(error.message)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {

  try {
    const contact = await Person.findById(req.params.id)
    if(contact){
      res.send(contact)
    } else {
      res.status(404).send('No such contact')
    }
  }  catch(error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {

    console.log(req.body)
    let user = {
      name: req.body.name,
      number: req.body.number
    }
    user = await Person.findByIdAndUpdate(req.params.id, user, { runValidators: true, context: 'query', useFindAndModify: false, new: true })
    res.status(200).send(user)

  } catch (error) {
    next(error)
  }

})

app.delete('/api/persons/:id', async (req, res, next) => {
  try{
    await Person.findByIdAndRemove(req.params.id, { useFindAndModify: false })
    res.status(204).end()
  } catch(error) {
    next(error)
  }
})
app.get('/info', async (req, res) => {
  const now = new Date().toString()
  const length = await Person.find({}).countDocuments()
  res.send(`Phonebook has info for ${length} people.
    ${now}`, )

})
app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body
  try{

    let user = new Person({ name, number })
    user = await user.save()
    console.log(user)
    res.send(user)


  } catch (error) {
    next(error)
  }





})

app.use(errorHandler)
app.listen(PORT, () => {
  console.log('App is listening on port 3001')
})

