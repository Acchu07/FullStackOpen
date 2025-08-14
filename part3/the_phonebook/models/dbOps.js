import phoneBook from './db.js'

export async function getPhoneBookArray() {
  return phoneBook.find({}, { __v: 0 })
}

export async function getPersonFound(objectID) {
  return phoneBook.findById(objectID, { __v: 0 }).exec()
}

export async function deletePersonFound(objectID) {
  return phoneBook.findByIdAndDelete(objectID)
}

export async function insertPerson(newPerson) {
  return phoneBook.insertOne(newPerson)
}

export async function updatePerson(personID, updatePersonDoc) {
  return phoneBook.findByIdAndUpdate(personID, updatePersonDoc, { new: true, runValidators: true })
}

export async function totalDocs() {
  return phoneBook.countDocuments({})
}

export async function findByName(name) {
  return phoneBook.findOne({ name: name }).exec()
}