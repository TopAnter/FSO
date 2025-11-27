import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'
import Notification from './components/ilmoitus'
import handler from './components/handlingPeople'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {      
      personService.getAll().then((personData) => {
        setPersons(personData)
      })
      .catch(error => {
            alert(`virhe ihmisten lataamisessa`)
          })
    }, [])
  const HandleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const FilterChange = (event) => {
    setFilter(event.target.value)
    
  }

  const shownPersons = persons.filter(henkilö =>
      henkilö.name.toLowerCase().includes(filter.toLowerCase())
  );

  const AddName = (event) => {
    event.preventDefault()
    if(handler.CheckPrevious(persons, newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const henkilö = persons.find(henkilö => henkilö.name === newName)
        const updatedHenkilö = {...henkilö, number: newNumber}
        personService
          .update(henkilö.id, updatedHenkilö)
          .then(palautusHenkilö => {
            setPersons(persons.map(henkilö => henkilö.id !== palautusHenkilö.id ? henkilö : palautusHenkilö))
            setSuccessMessage(
            `${palautusHenkilö.name} number was changed succesfully`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
            `${newName} was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(henkilö => henkilö.id !== henkilö.id))
          })
      return
    }}

    const henkilö = {
      name: newName,
      number: newNumber
    }

    personService.create(henkilö).then(palautusHenkilö => {
      setPersons(persons.concat(palautusHenkilö))
      setSuccessMessage(
        `${palautusHenkilö.name} was added successfully`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
    .catch(error => {
            alert(`virhe ihmisten lataamisessa`)
          })
    setNewName('')
    setNewNumber('')


    }
  const poistaHenkilö = (id) => {
    return () => {
      if(window.confirm(`Delete ${persons.find(henkilö => henkilö.id === id).name}`)){
      const poistettava = persons.find(henkilö => henkilö.id === id).name
      personService
        .remove(id)
        .then(() => {
          personService
            .getAll()
            .then((personData) => {
              setPersons(personData)
              setSuccessMessage(
            `${poistettava} was deleted successfully`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            })
            .catch(error => {
            alert(`virhe ihmisen poistamisessa`)
          })
        })
    }}
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification.badNotification message={errorMessage} />
      <Notification.goodNotification message={successMessage} />
      <handler.Filter filter={filter} FilterChange={FilterChange}/>

      <h2>Add a new</h2>
      <handler.PersonForm
      filter={filter}
      AddName={AddName}
      newName={newName}
      HandleNameChange={HandleNameChange}
      newNumber={newNumber}
      HandleNumberChange={HandleNumberChange}
      />

      <h2>Numbers</h2>

      <handler.People 
      people = {shownPersons}
      poistaHenkilö={poistaHenkilö}
      />
      
    </div>
  )

}

export default App