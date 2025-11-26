import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
const People = (props) => {
  return(
    <div>
      {props.people.map(henkilö => (
        <p key={henkilö.id}>
          {henkilö.name} {henkilö.number} <button onClick={props.poistaHenkilö(henkilö.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}

const CheckPrevious = (persons, name) => {
  return persons.some(henkilö => henkilö.name === name);

}

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value={props.filter} onChange={props.FilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form  value={props.filter} onSubmit={props.AddName}>
        <div>
          name: <input value={props.newName}
          onChange={props.HandleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber}
          onChange={props.HandleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    if(CheckPrevious(persons, newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const henkilö = persons.find(henkilö => henkilö.name === newName)
        const updatedHenkilö = {...henkilö, number: newNumber}
        personService
          .update(henkilö.id, updatedHenkilö)
          .then(palautusHenkilö => {
            setPersons(persons.map(henkilö => henkilö.id !== palautusHenkilö.id ? henkilö : palautusHenkilö))
          })
          .catch(error => {
            alert(`${newName} has already been removed from server`)
            setPersons(persons.filter(henkilö => henkilö.id !== henkilö.id))
          })
      return
    }}

    const henkilö = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    personService.create(henkilö).then(palautusHenkilö => {
      setPersons(persons.concat(palautusHenkilö))
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
      personService
        .remove(id)
        .then(() => {
          personService
            .getAll()
            .then((personData) => {
              setPersons(personData)
            })
            .catch(error => {
            alert(`virhe ihmisen poistamisessa`)
          })
        })
    }}
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} FilterChange={FilterChange}/>

      <h2>Add a new</h2>
      <PersonForm
      filter={filter}
      AddName={AddName}
      newName={newName}
      HandleNameChange={HandleNameChange}
      newNumber={newNumber}
      HandleNumberChange={HandleNumberChange}
      />

      <h2>Numbers</h2>

      <People 
      people = {shownPersons}
      poistaHenkilö={poistaHenkilö}
      />
      
    </div>
  )

}

export default App