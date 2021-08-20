import React from 'react';



const Country = ({country, defineCall}) => {
defineCall(country)
    console.log("this api", process.env)    
    console.log("es lo que recibe country component", country)
    return (
       <div>
           <h2> {country.name} </h2>
           
           <p>Capital: {country.capital}</p>
           <p>Population: {country.population}</p>
           <ul>Languages:</ul>

        
           {country.languages.map(language => {
               return <li key={language.name}>{language.name}</li>
           })}
           <img src={country.flag} alt={`Flag of ${country.name}`}></img>

           </div>
    )
}

export default Country