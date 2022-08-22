import React from 'react'
import { Button } from 'react-bootstrap';
const WeatherButton = ({cities,selectedCity,handleCity}) => {
  return (
    <div className="weather-button">
      <Button variant={`${selectedCity == null ? "outline-warning" : "warning"}`} onClick={()=> handleCity(null)}>Current Location</Button>
      {cities.map((item)=>( 
        <Button variant={`${selectedCity == item ? "outline-warning" : "warning"}`} key={item} onClick={() => handleCity(item)}>{item}</Button>))}
    </div>
  )
}

export default WeatherButton