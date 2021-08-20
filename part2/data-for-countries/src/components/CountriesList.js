import React from 'react'

const CountryLi = (props) => {
   console.log(props)
   return (
<>

<li>{props.name} <button onClick={props.method} id={props.name}>Show</button></li>
</>
    )
}

const CountriesList = ({countries, showCountry}) => {
   
   console.log(countries)
   return (
<div>
    <h2>Countries list</h2>
    <ul>
    {countries.map(country => {
  console.log(country.name)
    return <CountryLi key={country.name} name={country.name} method={showCountry} />
    })}
    </ul>
</div>
    )}
export default CountriesList


