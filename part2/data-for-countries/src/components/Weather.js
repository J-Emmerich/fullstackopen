import React from 'react'

const Weather = ({info}) => {
   console.log("what weather receives", info)
    return (

        <div>
        {info !== undefined ? <>
            <h2>Weather in {info.location.name}</h2>
            <p>Temperature: {info.current.temperature}Cº</p>
        <img src={info.current.weather_icons[0]}></img>
      </> : null} 
       </div>    )
}

export default Weather