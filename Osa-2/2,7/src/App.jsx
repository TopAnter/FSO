import { useState } from 'react'
const People = (props) => {
  return(
    <div>
      {props.people.map(henkilö => (
        <p key={henkilö.id}>
          {henkilö.name} {henkilö.number}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2  },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3  },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4  }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      alert(`${newName} is already added to phonebook`)
      return
    }

    const henkilö = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(henkilö))
    setNewName('')
    setNewNumber('')


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

      <People people = {shownPersons}/>
      
    </div>
  )

}

export default App