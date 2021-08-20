import React, { useEffect, useState } from "react";
import ShowCountries from "./components/ShowCountries";
import Weather from "./components/Weather";
import Country from "./components/Country";
import Search from "./components/Search";
import axios from 'axios'


function App() {
  
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFiltered] = useState([])
  const [showList, setShowList] = useState(true);
  const [defined, setDefined] = useState('');
  const [weather, setWeather] = useState(undefined)
  
const getAll = () => {
  console.log("_use effect get all")
 axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => response.data)
    .then(data => {
      
      setCountries(countries.concat(data));
    })
}
const getWeather = (country) => {
  console.log("this is the country", country)
  if(country !== '') {

    const key = process.env.REACT_APP_WEATHER_API;
    const city = country[0].capital
    axios
    .get(`http://api.weatherstack.com/current?access_key=${key}&query=${city}`)
    .then(response => setWeather(response.data))
  }
}
const showCountry = (event) => {
  const filtered = countries.filter(country => {
    
    return country.name === event.target.id
  })
  console.log(filtered);
  setFiltered(filtered);
  setDefined(filtered)
  setShowList(!showList)

}

const defineCall = (country) => {
 console.log(country);
  
}

useEffect(getAll,[])
useEffect(()=>{
  getWeather(defined)
},[defined])



const handleSearch = (event) => {
  if(showList === false){
    setShowList(true)
  }
  setSearch(event.target.value);
}


const filterCountries = () => {
    console.log("_use effect filter")
    const filtered = countries.filter(country => {
      console.log(country) 
      return country.name.toLowerCase().includes(search.toLowerCase());
    })
    console.log("length", filtered.length);
    setFiltered(filtered)
    if(filtered.length === 1){
      setDefined(filtered)
      setShowList(!showList)
    }
  
}
useEffect(filterCountries, [search]);






  return (
    <div>
      <Search onChange={handleSearch} value={search}/>
{ showList ? 
  <ShowCountries filteredCountries={filteredCountries} showCountry={showCountry} defineCall={defineCall}/> :
  <>
  <Country country={filteredCountries[0]} defineCall={defineCall} />
  <Weather info={weather} />
</>
}
      
    </div>
  );
}

export default App;
