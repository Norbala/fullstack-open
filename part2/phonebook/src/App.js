import { useEffect, useState } from 'react'
import backend from './backendComm/backend'

// <button onClick={()=> console.log(props.persons)}>press me</button>

const SubmitForm = ({handleFilter}) => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <h3 className='filterTitle'>Filter</h3>
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
      {props.persons.map(person => <SinglePerson key={person.name} person = {person} function={props.function} />) 
    }
  </>
  )
}


const SinglePerson = (props) => {
  return (
    <> <div>{props.person.name} {props.person.number} <DeleteButton id={props.person.id} function={props.function} /> </div> </>
  )
}     // <singlePerson person={} />

const DeleteButton = (props) => {
  return (
    <button id={props.id} onClick={(event) => props.function(event.target.id)}>delete</button>
  )
} 

const NotificationSuccess = ({ message}) => {
  

  if (message === null) {
    return null // ovo mi je trebalo jos prije, empty return
  }
  
  const successStyle = {
    backgroundColor: "green",
    color: "yellow"
  }
  return (   
    <div style={successStyle} >
      {message}
    </div>
  )
};

const NotificationError = ({ message}) => {
  

  if (message === null) {
    return null // ovo mi je trebalo jos prije, empty return
  }
  
  const errorStyle = {
    backgroundColor: "red",
    fontWeight: "800"
  }
  return (   
    <div style={errorStyle} >
      {message}
    </div>
  )
};


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setMessage] = useState(null);
  // const [showAll, setShowAll] = useState(true)
  
  useEffect(() => {
    console.log('effect')
    backend.getAll().then(response => setPersons(response))

  }, [])



  // sets necessary states to display message and reset the states/input form afterward

  // MAKNUTI OVO I SVE STAVITI U ADD NOTE UPDATE I CATCH
  const messageSet = (input, response, error=true) => {
    let variable = "Added successfully ";
    if (input==="change") {
      variable = "Number changed successfully for contact ";
    }
    setErrorMessage(`${variable}${newName}`);
    console.log("newName je ", newName);
    // nastavi ovdje
    //document.querySelector(".message").classList.toggle("success");
    if (input==="change") {
      
      setTimeout(()=>{
        //document.querySelector(".message").classList.toggle("success")
        setErrorMessage(null);
        
        }
        ,4000);

    } else {
      setTimeout(()=>{
        //document.querySelector(".message").classList.toggle("success")
        setErrorMessage(null)
        }
        ,4000);
    }
    
    document.getElementById("nameField").value = "";
    setNewName("");
    document.getElementById("numberField").value ="";
    setNewNumber("");
    if (input==="change") {
      setPersons(response);
    } else {setPersons(persons.concat(response))}
  }
  //

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
    
    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already registered as another user's number.`)
      document.getElementById("numberField").value ="";
      setNewNumber("");
      testNumb = "";

    }

    if (persons.some(person => person.name === newName)) {      
      if (window.confirm(`Do you really want to replace old number with a new one for ${newName}?`)) {
        const id = persons.find(person => person.name === newName).id;
        console.log("id ", id);
        tester = "";
        testNumb = "";
        console.log("tester unutar: ", tester);
        backend.replace(id, {name:newName,number:newNumber})
        .then( response => {
        console.log("replace response ",response);
        setMessage(`Number changed successfully for contaaact ${response.name}`)

        setTimeout(()=> {
          setMessage(null)
        }, 4000)

        document.getElementById("nameField").value = "";
        setNewName("");
        document.getElementById("numberField").value ="";
        setNewNumber("");
        backend.getAll().then(response => {
          setPersons(response)
        }
        )
        }).catch(error => {
          console.log("error content",error);
          setErrorMessage(
            
            ` ${newName} was already removed from server`
          )
          document.getElementById("nameField").value = "";
          setNewName("");
          document.getElementById("numberField").value ="";
          setNewNumber("");
          setTimeout(()=> {
            setErrorMessage(null)
          }, 4000)
        } )
      } 
      }
    // nkead su rješenja jednostavnija nego što se čine..... newName gore ubaciti za varijablu u poruci
    
    

    console.log(tester);
    console.log(testNumb);
    if ((tester&&testNumb)!=="") {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      
      backend
      .addNumb(nameObject)
      .then(response => {
        console.log("response je ", response);

        setMessage(`Added successfully (for real) ${response.name}`);
        setTimeout(()=> {
          setMessage(null)
        }, 3000)

        document.getElementById("nameField").value = "";
        setNewName("");
        document.getElementById("numberField").value ="";
        setNewNumber("");
        setPersons(persons.concat(response))
        })
        

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

  const deleteFunc = (event) => {    // PRVI FEJL - NE STAVLJATI DOLE U COMPONENT deletefunc() jer to automatski radi function call pri svakom renderu.. valjda
    // vec treba napisati samo deleteFunc
    const result = personsToShow.filter(object => object.id===parseInt(event));
    if (window.confirm(`Do you really want to delete ${result[0].name}?`)) {
      backend.deleteElem(event).then(() => backend.getAll().then(response => setPersons(response))) 
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationSuccess message={successMessage} />
      <NotificationError message={errorMessage} />

      <SubmitForm handleFilter={handleFilterChange} />
      <h2>Add a new contact</h2>
      <UserForm NameChange={handleNameChange} NumberChange={handleNumberChange} Note={addNote} />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} function={deleteFunc} />
      
    </div>
  )
}
export default App;

