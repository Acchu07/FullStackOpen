import { useEffect, useState } from 'react'
import personNumber from './axios'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [tempStorage, setTempStorage] = useState([...persons])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [createNotification, setCreateNotification] = useState(null)

  useEffect(() => {
    personNumber.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setTempStorage(initialPersons)
      })
  }, [])

  const handleClick = (event) => {
    event.preventDefault()

    let personToUpdate = persons.find(function (element) { return element.name === newName })
    if (personToUpdate) {
      personToUpdate.number = newNumber;
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
        && personNumber.updatePersonInfo(personToUpdate)
          .then((updatedData) => {
            setPersons(persons.map(person => person.id === updatedData.id ? updatedData : person))
            setCreateNotification({type:'Green',message:`${updatedData.name} has been modified`})
            setTimeout(() => {
              setCreateNotification(null);
            }, 2000);

          }).catch((error) => {
            alert(`${error}`)
          })
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personNumber.createPerson(newPerson)
      .then(personCreatedData => {
        setPersons(persons.concat(personCreatedData))
        setCreateNotification({type:'Green',message:`${personCreatedData.name} has been added`})
        setTimeout(() => {
          setCreateNotification(null);
        }, 2000);
      })
      .catch((error) => {
        alert(`${error}`)
      })
  }

  const handleDelete = (person) => {

    window.confirm(`Delete ${person.name}?`) && personNumber.deletePerson(person.id)
      .then((deletedPerson) => {
        setPersons(persons.filter((person => person.name !== deletedPerson.name)))
      })
      .catch((error) => {
        // alert(`${error}`)
        setPersons(persons.filter((persons => persons.name !== person.name)))
            setCreateNotification({type:'error',message:`${person.name} has already been removed`})
            setTimeout(() => {
              setCreateNotification(null);
            }, 2000);
      })
  }

  function handleFilter(event) {
    const wordToSearch = event.target.value.toLowerCase()
    const filteredPersons = tempStorage.filter(person => person.name.toLowerCase().includes(wordToSearch))
    setPersons(filteredPersons)
  }

  const handleStringChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(Number(event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={createNotification} />
      <Filter onChange={handleFilter} />
      <h3>Add New</h3>
      <PersonForm handleStringChange={handleStringChange} handleNumberChange={handleNumberChange} handleClick={handleClick} />
      <h3>Numbers</h3>
      <Persons people={persons} onClick={handleDelete} />
    </div>
  )
}

function Filter({ onChange }) {
  return (
    <div>
      filter shown with <InputElement onChange={onChange} />
    </div>)
}

function PersonForm({ handleStringChange, handleNumberChange, handleClick }) {
  return (
    <form>
      <div>
        name: <InputElement onChange={handleStringChange} />
        number:
        <InputElement onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleClick} >add</button>
      </div>
    </form>)
}

function Persons({ people, onClick }) {
  return people.map((person) => {
    return (
      <div key={person.id}>{person.name} {person.number}
        <button onClick={() => onClick(person)}>Delete</button>
      </div>)
  }
  )
}

function InputElement({ onChange }) {
  return <input onChange={onChange} />
}

function Notification({ message }) {
  if (message === null) {
    return null;
  }

  return (
    <div className='created'>
      <p className={message.type === 'Green' ? 'green' : 'error'}>{message.message}</p>
    </div>
  )
}

export default App