require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))





app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//kaikki henkilöt
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//yksittäinen henkilö
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

//luo id
const generateId = () => {
  const id = Math.floor(Math.random() * 100000) + 1
  return String(id)
}

//lisää henkilö
app.post('/api/persons', (request, response) => {
  const body = request.body

  //tarkista onko nimi ja numero
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  //tarkista onko nimi uniikki
  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

//poista henkilö
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

//info page
app.get('/info', (request, response) => {
  const listLength = persons.length
  const time = new Date().toString()
  response.send(`Phonebook has info for ${listLength} people <br><br> ${time}`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})