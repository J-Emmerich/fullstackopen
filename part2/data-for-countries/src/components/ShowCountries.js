import React from 'react';
import CountriesList from './CountriesList';
import Country from './Country';


const ShowCountries = ({filteredCountries, showCountry, defineCall}) => {
   console.log(filteredCountries, filteredCountries.length);
   if(filteredCountries.length === 0) {
       return <p>Search for a Country</p>
   }
   else if(filteredCountries.length === 1) {
       console.log("HEEERE");
       return <Country country={filteredCountries[0]} defineCall={defineCall} />
   } else if(filteredCountries.length < 10) {
    console.log("here too");
    return  <CountriesList countries={filteredCountries}  showCountry={showCountry} /> }
        else {
            return <p> Too Many matches</p>
        } 

}

export default ShowCountries