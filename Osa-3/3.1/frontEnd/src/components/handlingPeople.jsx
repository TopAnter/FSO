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

export default {
    People, 
    CheckPrevious,
    Filter,
    PersonForm
}