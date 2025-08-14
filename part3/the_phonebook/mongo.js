import mongoose from 'mongoose'

main().catch(err => console.log(err))

const phonebook = new mongoose.Schema({
  _id: Number,
  name: { type: String, minLength: 3, required: true },
  number: { type: String, required: true },
})


const phoneBook = mongoose.model('the_phonebook', phonebook)

async function insertMultipleDocs() {
  const result = await phoneBook.insertMany(data, { rawResult: true })
  console.log(result)
}

async function main() {

  await mongoose.connect(process.env.MONGODB_URI)
  await insertMultipleDocs()
  await mongoose.connection.close()
}

let data = [
  {
    _id: 1,
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    _id: 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    _id: 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    _id: 4,
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]

// console.log(process.argv.length)
// if (process.argv.length === 3) {
//   console.log(process.argv[2])
//   return
// }
//
// const password = process.argv[2]
// const name = `"${process.argv[3]}"`
// const number = process.argv[4]
//
// console.log(password, name, number)