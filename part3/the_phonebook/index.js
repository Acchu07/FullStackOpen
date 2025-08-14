import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {
  deletePersonFound,
  findByName,
  getPersonFound,
  getPhoneBookArray,
  insertPerson,
  totalDocs,
  updatePerson
} from './models/dbOps.js'

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173'
}

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postReqData'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['postReqData'](req, res),
  ].join(' ')
}))
morgan.token('postReqData', function (req) {
  return JSON.stringify(req.body)
})
app.use(express.json())
app.use(cors(corsOptions))
// app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.json('Enters')
})

app.get('/api/persons', async (req, res) => {
  const phoneBookArray = await getPhoneBookArray()
  res.status(200).json(phoneBookArray)
})


app.get('/info', async (req, res) => {
  const reqReceivedTime = new Date().toString()
  const phoneBookLength = await totalDocs()
  res.set('Content-Type', 'text/plain').status(200).json(`Phonebook has info for ${phoneBookLength} people.
        \n\n${reqReceivedTime}`)
})

app.get('/api/persons/:id', async (req, res) => {
  const objectID = req.params.id
  const personFound = await getPersonFound(objectID)
  if (personFound) return res.status(200).json(personFound)
  res.status(404).end()
})

app.delete('/api/persons/:id', async (req, res) => {
  const objectID = req.params.id
  const personFound = await deletePersonFound(objectID)
  if (personFound) return res.status(200).json(personFound)
  return res.status(404).end()
})

app.post('/api/persons', async (req, res) => {
  const newPerson = {
    _id: getRandomInt(max),
    ...req.body
  }
  // if (!newPerson.name || !newPerson.number) {
  //   return res.status(400).end()
  // }
  const checkIfExists = await findByName(newPerson.name)
  if (checkIfExists) {
    return res.status(409).json({ message: 'Person Exists in DB' })
  }
  const result = await insertPerson(newPerson)
  return res.status(200).json(result)
})

app.put('/api/persons/:id', async (req, res) => {
  const objectID = req.params.id
  const { id, ...personToUpdate } = req.body
  console.log(id) // Gotta use it somewhere to remove lint error
  const result = await updatePerson(objectID, personToUpdate)
  console.log(result)
  return res.status(200).json(result)

})

app.use((err, req, res) => {
  switch (err.name) {
  case ('CastError'):
    res.status(400).json({ error: 'malformatted id' })
    break
  case ('ValidationError'):
    res.status(400).json({ error: err.message })
    break
  default:
    // console.log(err)
    res.status(500).json('Something broke!')
  }

})


app.listen(3001)

const max = 9999

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

