import { useState } from 'react'

// <button onClick={()=> console.log(props.persons)}>press me</button>

const SubmitForm = ({handleFilter}) => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
    <div>
      filter shown with name: <input id='filterField' onChange={handleFilter} />
    </div>
  </form>
  )
}

const UserForm = (props) => {
  return (
    <>
      <form onSubmit={(event)=>event.preventDefault()}>
        <div>
          name: <input id='nameField' onChange={props.NameChange}/>
        </div>
        <div>
          number: <input id="numberField" onChange={props.NumberChange} />
        </div>
        <div>
          <button onClick={props.Note} type="submit">add</button>

          
        </div>
      </form>
    </>
  )
}
/* OVDJE LINIJA  s .map metodom -> STAVLJAJ KEY tu, iako se direktno ne koristi u SinglePerson komponenti, treba zbog ID-ja, keya.. */
const Persons = (props) => {
  return (
    <>
      {props.persons.map(person => <SinglePerson key={person.name} person = {person} />) 
    }
  </>
  )
}


const SinglePerson = (props) => {
  return (
    <> <div>{props.person.name} {props.person.number}</div> </>
  )
}     // <singlePerson person={} /> 

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  // const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    let tester = "ch";
    let testNumb = "gh";
    console.log("proba ", persons, persons.includes({name: newName}));    //napravi komponentu, props newName, persons npr
    console.log({name: newName});
    if (newName==="") {
      return (
        alert("'' (empty name/number) can't be added to phonebook. Try again.")
      )
    }
    if (newNumber==="") {
      return (alert("empty number can't be added. Try again."))
    }
    
    if (persons.some(person => person.name === newName)) {      

        alert(`${newName} is already added to phonebook.`);
        document.getElementById("nameField").value = "";
        setNewName("");
        tester = "";
    }
    if (persons.some(person => person.number === newNumber)) {
        alert(`${newNumber} is already registered as another user's number.`)
        document.getElementById("numberField").value ="";
        setNewNumber("");
        testNumb = "";

    }

    console.log(tester);
    console.log(testNumb);
    if ((tester&&testNumb)!=="") {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))

      document.getElementById("nameField").value = "";
      setNewName("");
      document.getElementById("numberField").value ="";
      setNewNumber("");
    }
    
  }

  

  const handleNameChange = (event) => {
    setNewName(event.target.value);   // dva propsa event i setNewName
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())    // toLower to ensure that filters match
  }

  // control the filter
  let personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter)) // toLower to ensure it matches with newFilter

  return (
    <div>
      <h2>Phonebook</h2>
      <SubmitForm handleFilter={handleFilterChange} />
      <h2>add a new</h2>
      <UserForm NameChange={handleNameChange} NumberChange={handleNumberChange} Note={addNote} />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
      
    </div>
  )
}
//
export default App