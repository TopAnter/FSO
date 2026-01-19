const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Topias_Maki:${password}@cluster0.8pnb6t4.mongodb.net/personApp?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
      name: name,
      number: number,
    })

    person.save().then(result => {
      console.log('person saved!')
      console.log(result)
      mongoose.connection.close()
    })
}else {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
