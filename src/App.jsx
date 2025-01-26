import React, { useState, useEffect } from 'react'
import './App.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import WAVES from 'vanta/dist/vanta.clouds.min';

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

    // useeffect for vanta.js wave effect
    useEffect(() => {
      WAVES({
        el: "#vanta-clouds",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00
      })
    }, [])
  

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
      
      // if(1<50){
      //   useEffect(() => {
      //     WAVES({
      //       el: "#vanta-clouds",
      //       mouseControls: true,
      //       touchControls: true,
      //       gyroControls: false,
      //       minHeight: 200.00,
      //       minWidth: 200.00,
      //       skyColor: 0x818c8d,
      //       sunColor: 0x0,
      //       sunGlareColor: 0x818181,
      //       sunlightColor: 0xa9a9a9,
      //       speed: 1.10
      //     })
      //   }, [])
      //   console.log(temp)
      // }
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

      <div className="container1  d-flex flex-column justify-content-between py-2 ">

        <div className="input_container ">
          <input value={text} onChange={(e) => setText(e.target.value)} className='cityInput  p-2 ' type="text" placeholder="Enter City Name" />
          <div className='searchicon p-1' onChange={Search}><img src={seachicon} width={50} alt="searchIcon" /></div>
        </div>

        <div><WeatherDetails icon={icon} sky={sky}  temp={temp} city={city} country={country} latitude={latitude} longitude={longitude} humidity={humidity} wind={wind} loading={loading} />
        </div>

        <div className='copyright text-center mt-3'>Done by <a href="https://deepakdigitalcraft.tech/">Deepakkumar</a> </div>


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
      </p> : <span className='h1 '> {temp} °C      </span>}</div>

      <div className="temp text-center fs-5 fw-bold"> {loading ? <p className="card-text placeholder-glow">
        <span className="placeholder col-7 rounded  "></span>
      </p> : <span> {sky.charAt(0).toUpperCase() + sky.slice(1)}</span>}</div>

      <div className="city text-center fs-2 fw-bold"> {loading ? <p className="card-text placeholder-glow">
        <span className="placeholder col-6 rounded  "></span>
      </p> : <span className='text-danger fs-1'> {city}</span>} </div>
      <div className="country text-center "> {loading ? <p className="card-text placeholder-glow">
        <span className="placeholder col-2 rounded  "></span>
      </p> : <span className='fw-bold'>{country}</span>}</div>
      <div className="cord d-flex justify-content-around mt-3">
        <div className='d-flex flex-column align-items-center'>
          <div className="lat">Latitude <br /> </div>
          {loading ? loaderanime :
            <div> <span className='fw-bold fs-5'> {latitude}</span></div>}
        </div>
        <div className="div d-flex flex-column align-items-center">
          <div className="long">Longitude <br /></div>
          <div>{loading ? loaderanime : <span className='fw-bold fs-5'> {longitude}</span>}</div>
        </div>
      </div>

      <div className="data-container d-flex justify-content-between mt-4 text-center">
        <div className="element d-flex flex-column justify-content-center align-items-center gap-1">
          <img width={30} src={humiditysky} alt="Humidity" />
          <div className='humidity-percent text-primary'>{loading ? loaderanime : <span className='fw-bold fs-4'> {humidity}%</span>}</div>
          <div className="weather-type">Humitidy</div>
        </div>

        <div className="element d-flex flex-column justify-content-center align-items-center gap-1">  
          <img width={30} src={windsky} alt="Wind" />
          <div className='humidity-percent text-white'>{loading ? loaderanime : <span className='fw-bold fs-4 text-secondary'> {wind}km/h</span>}</div>
          <div className="weather-type ">Wind Speed</div>
        </div>
      </div>

    </>
  )
}


