import React, { useState, useEffect } from 'react'
import './App.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


// images videos
import seachicon from "./assets/searchicon.png"
import clearsky from "./assets/clearsky.gif"
import cloudsky from "./assets/cloudsky.gif"
import drizzilesky from "./assets/drizzilesky.gif"
import errorsky from "./assets/errorsky.gif"
// import snowsky from "./assets/"
import humiditysky1 from "./assets/brokensky.gif"
// import windsky1 from "./assets/"
import showersky from"./assets/showersky.gif"
// import rainsky from "./assets/"

import humiditysky from "./assets/newhumitidy.gif"
import windsky from "./assets/newwind.gif"


function App() {
  const [icon, setIcon] = useState()
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState()
  const [text, setText] = useState('Erode')
  const [country, setCountry] = useState()
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [wind, setWind] = useState(0)
  const [humidity, setHumitidy] = useState(0)
  const [citNotFound, setCityNotFound] = useState(false)
  const [loading, setloading] = useState(true)
  const [sky,setSky]=useState('')

  const weatherIconMap={
    '01d':clearsky,
    '01n':clearsky,
    '02d':cloudsky,
    '02n':cloudsky,
    '03d':drizzilesky,
    '03n':drizzilesky,
    '04d':humiditysky1,
    '04n':humiditysky1,
    '09d':showersky,
    '09n':showersky,
    // '10d':rainsky,
    // '10n':rainsky,
    // '11d':thunderstorm,
    // '11n':thunderstorm,
    // '13d':snowsky,
    // '13n':snowsky,
    // '50d':mistsky,
    // '50n':mistsky,
  }

  //search function

  const Search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=62a3d46270d467a2a3a98b9ed34b4c3b&units=Metric`

    try {
      let res = await fetch(url);
      let data = await res.json();
      // await new Promise(resolve => setTimeout(resolve, 33000)); // 3 
      console.log(data)
      if (data.cod === "404") {
        console.error("City not found")
        setHumitidy(0)
        setCity("City Not Found")
        setLatitude(0)
        setLongitude(0)
        setCountry("-")
        setWind(0)
        setTemp(Math.floor(0))
        setSky('')
        setIcon(errorsky)


        return;
      }

      setHumitidy(data.main.humidity)
      setCity(data.name)
      setLatitude(data.coord.lat)
      setLongitude(data.coord.lon)
      setCountry(data.sys.country)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp_max))
      setloading(false)
      setSky(data.weather[0].description)
      const weatherIconcode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconcode] || clearsky)
      // setIcon(data)

    }
    catch (error) {
      console.log("An error occur:", error.message)
    }
    finally {
    }

  }

  useEffect(() => {
    Search()
  }, [Search])



  return (
    <>

      <div className="container d-flex flex-column justify-content-around bg-warning">

        <div className="input_container d-flex align-items-center justify-content-around border border-dark rounded bg-white">
          <input value={text} onChange={(e) => setText(e.target.value)} className='cityInput border-0 p-2 w-100' type="text" placeholder="Enter City Name" />
          <div className='searchicon p-1' onChange={Search}><img src={seachicon} width={50} alt="searchIcon" /></div>
        </div>

        <div><WeatherDetails icon={icon} sky={sky}  temp={temp} city={city} country={country} latitude={latitude} longitude={longitude} humidity={humidity} wind={wind} loading={loading} />
        </div>


        <div className='copyright text-center mt-3'>Designed by Deepakkumar</div>
      </div>


    </>
  )
}
export default App


// Weathrer details function
const WeatherDetails = ({ sky,icon, temp, country, city, latitude, longitude, humidity, wind, loading }) => {
  const loaderanime = <div class="spinner-border " role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  return (
    <>



      {loading ? <p className="card-text d-flex justify-content-center placeholder-glow rounded">
        <span className="placeholder rounded-5 p-5 "></span>
      </p> : <div className="images text-center p-2">
        <img src={icon} alt="clearsky" />
      </div>}


      <div className="temp text-center fs-5 fw-bold"> {loading ? <p className="card-text placeholder-glow">
        <span className="placeholder col-7 rounded  "></span>
      </p> : <span className='h1'> {temp} ℃</span>}</div>

      <div className="temp text-center fs-5 fw-bold"> {loading ? <p className="card-text placeholder-glow">
        <span className="placeholder col-7 rounded  "></span>
      </p> : <span> {sky}</span>}</div>

      <div className="city text-center fs-2 fw-bold"> {loading ? <p className="card-text placeholder-glow">
        <span className="placeholder col-6 rounded  "></span>
      </p> : <span> {city}</span>} </div>
      <div className="country text-center "> {loading ? <p className="card-text placeholder-glow">
        <span className="placeholder col-2 rounded  "></span>
      </p> : <span>{country}</span>}</div>
      <div className="cord d-flex justify-content-around mt-3">
        <div className='d-flex flex-column align-items-center'>
          <div className="lat">Latitude <br /> </div>
          {loading ? loaderanime :
            <div> <span className='fw-bold'> {latitude}</span></div>}
        </div>
        <div className="div d-flex flex-column align-items-center">
          <div className="long">Longitude <br /></div>
          <div>{loading ? loaderanime : <span className='fw-bold'> {longitude}</span>}</div>
        </div>
      </div>

      <div className="data-container d-flex justify-content-between mt-4 text-center">
        <div className="element d-flex flex-column justify-content-center align-items-center gap-1">
          <img width={30} src={humiditysky} alt="Humidity" />
          <div className='humidity-percent text-primary'>{loading ? loaderanime : <span className='fw-bold'> {humidity}%</span>}</div>
          <div className="weather-type">Humitidy</div>
        </div>

        <div className="element d-flex flex-column justify-content-center align-items-center gap-1">
          <img width={30} src={windsky} alt="Wind" />
          <div className='humidity-percent text-white'>{loading ? loaderanime : <span className='fw-bold'> {wind}km/h</span>}</div>
          <div className="weather-type">Wind Speed</div>
        </div>
      </div>

    </>
  )
}


