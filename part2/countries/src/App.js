import axios from "axios"
import {useState, useEffect} from "react"

const api_key = process.env.REACT_APP_API_KEY;


const SearchForm = ({handleFilter}) => {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
    <div>
      find countries: <input id='filterField' onChange={handleFilter} />
    </div>
  </form>
  )
}

const CountryButton = (props) => {
  
  
  return (
    <div key={props.divKeyText}>{props.divKeyText} 
    <button key={props.bttnKey} id={props.bttnID} onClick={props.buttonFunct} >show</button>

    </div>
  )
}

const CountryData = ({country}) => {
  console.log(country)
  let langArray = [];
  for (let language in country.languages) {        // props: countriesToShow
    langArray.push(country.languages[language])
  }
  let link = country.flags["png"]
  return (
    <>
    <h3>{country.name.common}</h3>
    <div> capital {country.capital}</div>
    <div> area {country.area}</div>
    <strong>languages:</strong>
    <ul>{langArray.map(lang => <li key={lang+country.name.common}>{lang}</li>)}</ul>         
    <img src={link} height={250} width={300} alt= ""/>
    </>
  )
}

const Weather = ({country, temperature, setTemp}) => {
  // some code
  
  useEffect(() => {
    
      axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca2}&appid=${api_key}`).then(response => {
        let lat = response.data[0].lat;
        let long = response.data[0].lon;
        
        let weatherCall = 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`).then
        (response => {
          setTemp(response.data.main.temp);
          })
        
        console.log("weathercall ", weatherCall);
        // console.log()/
  })

      
  
}, [])


return (
  <>
    <h2>Weather in {country.capital}</h2>
    <p>Temperature: {temperature}</p>
  </>
)

  }




const MultiCountryView = ({country, button}) => {
  return (
    <>
    <CountryButton key={country.cioc} divKeyText={country.name.common} bttnKey={country.fifa} bttnID={country.name.common} buttonFunct={button} />
    <CountryData country={country} />
    </>
  )
}

const FilterLogic = ({stateFilter,countries, buttonProps, filteredButtons, temperature, setTemp}) => {
  
  if (stateFilter==="") {
      
      return <div></div>
  } else {
      let countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(stateFilter))
       if (countriesToShow.length>10) {
          return (
            <div>Too many matches, specify more precise</div>
          )
        } 
        else if (countriesToShow.length>1&&countriesToShow.length<=10) {

          return (
          <>
          {countriesToShow.map(country => {
            if (filteredButtons[country.name.common]===false) {
              return ( <MultiCountryView key={country.cioc} country={country} button={buttonProps} /> )   // RETURRRRRRRRRRNNNN
          }
            return (
              <CountryButton key={country.cioc} divKeyText={country.name.common} bttnKey={country.fifa} bttnID={country.name.common} buttonFunct={buttonProps} />
          )

          })}
        </>
          )
        } else if (countriesToShow.length===1) {
            return (                                                // KEY !!!!!}   potencijalni novi komponent
            <>
              <CountryData country={countriesToShow[0]} />
              <Weather country={countriesToShow[0]} temperature={temperature} setTemp={setTemp} />
            </>
          )
    }  else {
    return <div>Filter not good, delete</div> 
  } 

  }
}
// main App
function App() {
  // const [country, setCountry] = useState([])

  const [allCountries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [buttonsState, setButtons] = useState({});
  const [temp, setTemp] = useState();
  
  
  // loading the data of all countries
  useEffect(() => {
    console.log('loading the countries, starting')
    axios
      .get('https://restcountries.com/v3.1/all').then(response => {
        console.log('loading finished')
        setCountries(response.data)
      })
  }, [])

  // setting the state to user input in search form
  const handleFilterChange = (event) => {
    let target = event.target.value.toLowerCase();
    setNewFilter(target);
    let countriesToShow = allCountries.filter(country => country.name.common.toLowerCase().includes(target))
    if (countriesToShow.length>1&&countriesToShow.length<=10) {
       let addState = {};
       for (let i=0; i<countriesToShow.length;i++) {
             let name = countriesToShow[i].name.common;
                
             addState[name]=true

           }
        setButtons(addState)
        console.log("print gore",addState);
          }
    
  }

  const handleButtonClick = (event) => {
    let targt = event.target.id;
    console.log("ime gumba",event.target.id);
    const newButtonState = {
      ...buttonsState,    // ovdje nastavi
      [targt]: !buttonsState[targt]  
  }
    setButtons(newButtonState)
  // console.log
  } 


  return (
    <div>
      <SearchForm handleFilter={handleFilterChange} />
      <FilterLogic countries={allCountries} stateFilter={newFilter} 
      buttonProps={handleButtonClick} filteredButtons={buttonsState} temperature={temp} setTemp={setTemp}/>
    </div>
  );
}

export default App;
