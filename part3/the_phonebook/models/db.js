import mongoose from 'mongoose'

const phonebook = new mongoose.Schema({
  _id: Number,
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    required: true,
  },
})

const phoneBookToJson = {
  transform: function (doc, returnedObject) {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
}

phonebook.set('toJSON', phoneBookToJson)

await mongoose.connect(process.env.MONGODB_URI)

const phoneBook = mongoose.model('phonebook', phonebook)

export default phoneBook
