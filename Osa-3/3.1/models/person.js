const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  //custom validators for phone number and name
const pituus = (value) => value.length >= 8
const valiViiva = (value) => value[2] === '-' || value[3] === '-'
const ovatNumeroita = (value) => /^\d{2,3}-\d+$/.test(value)


const checkNumber = [
    { validator: pituus, message: 'Puhelinnumero tulee olla vähintään 8 merkkiä' },
    {validator: valiViiva, message: 'puhelinnumeron 3 tai 4 merkki tulee olla väliviiva'},
    {validator: ovatNumeroita, message: 'ennen ja jälkeen väliviivaa tulee olla vain numeroita'}
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'User name required']
  },
  number: {
    type: String,
    validate: checkNumber,
    required: [true, 'User phone number required']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)