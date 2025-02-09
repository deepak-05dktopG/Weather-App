import React, { useState, useEffect, useRef } from 'react'
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
import snowsky from "./assets/snowsky.gif"
import humiditysky1 from "./assets/brokensky.gif"
import mistsky from "./assets/mistsky.gif"
import showersky from "./assets/showersky.gif"
import rainsky from "./assets/rainysky.gif"
import nightclearsky from "./assets/nightclearsky.gif"
import nightcloudsky from "./assets/nightcloudsky.gif"
import humiditysky from "./assets/newhumitidy.gif"
import windsky from "./assets/newwind.gif"
import thunderstorm from "./assets/thunderstormsky.gif"

function App() {
  const [icon, setIcon] = useState()
  const [iconCode, setIconCode] = useState()
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
  const [sky, setSky] = useState('')
  const [skycolor, setSkyColor] = useState('rgb(11, 160, 190)')
  const [cloudcolor, setCloudColor] = useState('rgb(176, 177, 177)')
  const [sunColor, setSunColor] = useState('rgb(232, 216, 0)')
  const [sunGlareColor, setSunGlareColor] = useState('rgb(26, 25, 24)')
  const [sunlightColor, setSunlightColor] = useState('rgb(226, 216, 13)')
  const [timeZone, setTimeZone] = useState('Europe/Berlin')
  const [timeZoneCode, setTimeZoneCode] = useState('')

  const inputref = useRef(null)
  // useeffect for vanta.js wave effect

  const weatherIconMap = {
    '01d': clearsky,
    '01n': nightclearsky,
    '02d': cloudsky,
    '02n': nightcloudsky,
    '03d': drizzilesky,
    '03n': drizzilesky,
    '04d': humiditysky1,
    '04n': humiditysky1,
    '09d': showersky,
    '09n': showersky,
    '10d': rainsky,
    '10n': rainsky,
    '11d': thunderstorm,
    '11n': thunderstorm,
    '13d': snowsky,
    '13n': snowsky,
    '50d': mistsky,
    '50n': mistsky,
  }
  const timZone = {
    '0': 'Africa/Abidjan',
    '3600': 'Africa/Algiers',
    '3600': 'Africa/Lagos',
    '3600': 'Europe/Berlin',
    '0': 'Africa/Bissau',
    '0': 'Africa/Casablanca',
    '0': 'Europe/London',
    '7200': 'Africa/Cairo',
    '7200': 'Africa/Harare',
    '7200': 'Africa/Johannesburg',
    '7200': 'Africa/Bissau',
    '-18000': 'America/New_York',
    '-21600': 'America/Chicago',
    '-25200': 'America/Denver',
    '-28800': 'America/Los_Angeles',
    '19800': 'Asia/Kolkata',
    '32400': 'Asia/Tokyo',
    '28800': 'Asia/Shanghai',
    '10800': 'Europe/Moscow',
    '32400': 'Asia/Tokyo',
    '46800': 'Pacific/Auckland',

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

      setInterval(() => {
        setloading(false)
      }, 3000);

      setSky(data.weather[0].description)
      setIconCode(data.weather[0].icon)
      setIcon(weatherIconMap[iconCode] || clearsky)
      setTimeZoneCode(data.timezone)
      setTimeZone(timZone[timeZoneCode])
      console.log("timezzzzzzzzzzone:", timeZoneCode)
      console.log("timezzzzzzzzzzone:", timeZone)




      if (iconCode[2] == 'n') {
        setSkyColor("rgb(0, 0, 0)")
        setSunColor("rgb(244, 244, 244)")
        setSunGlareColor('rgb(255, 255, 255)')
        setSunlightColor('rgb(253, 253, 253)')
        setCloudColor('rgb(94, 86, 86)')
        inputref.current.style.color = 'white';
      }
      else if (iconCode == '02d' || iconCode == '03d') {
        setSkyColor("rgb(11, 160, 190)")
        setSunColor("rgb(119, 115, 97)")
        setSunGlareColor('rgb(79, 75, 75)')
        setSunlightColor('rgb(76, 76, 69)')
        setCloudColor('rgb(176, 177, 177)')
        inputref.current.style.color = 'black';
      }
      else if (iconCode == '04d' || iconCode == '09d' || iconCode == '10d' || iconCode == '11d' || iconCode == '13d' || iconCode == '50d') {
        setSkyColor("rgb(91, 181, 206)")
        setSunColor("rgb(119, 115, 97)")
        setSunGlareColor('rgb(79, 75, 75)')
        setSunlightColor('rgb(76, 76, 69)')
        setCloudColor('rgb(153, 156, 156)')
        inputref.current.style.color = 'black';

      }
      else if (iconCode == '01d') {
        setSkyColor("rgb(11, 160, 190)")
        setSunColor("rgb(255, 215, 17)")
        setSunGlareColor('rgb(255, 206, 93)')
        setSunlightColor('rgb(254, 251, 72)')
        setCloudColor('rgb(176, 177, 177)')
        inputref.current.style.color = 'black';

      }
      else {
        setSkyColor("rgb(11, 160, 190)")
        setSunColor("rgb(255, 226, 83)")
        setSunGlareColor('rgb(255, 187, 28)')
        setSunlightColor('rgb(255, 183, 0)')
        setCloudColor('rgb(176, 177, 177)')
        inputref.current.style.color = 'black';
      }



    }
    catch (error) {
      console.log("An error occur:", error.message)
    }


  }

  useEffect(() => {
    Search()
  }, [Search])



  useEffect(() => {
    WAVES({
      el: "#vanta-clouds",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      skyColor: skycolor,
      cloudColor: cloudcolor,
      cloudShadowColor: 0x213559,
      sunColor: sunColor,
      sunGlareColor: sunGlareColor,
      sunlightColor: sunlightColor,
      speed: wind < 5 ? wind : 5
    })
  }, [icon])



  return (
    <>

      {loading ? <div className="container">
        <div class="cloud front">
          <span className="left-front"></span>
          <span className="right-front"></span>
        </div>
        <span className="sun sunshine"></span>
        <span className="sun d-flex align-items-center justify-content-center text-white">Loading...</span>
        <div className="cloud back">
          <span className="left-back"></span>
          <span className="right-back"></span>
        </div>
      </div> :

        <div ref={inputref} className="container1  d-flex flex-column justify-content-between">

          <div className="input_container1 mt-3">
            <div className='input_container'>
              <input value={text} onChange={(e) => setText(e.target.value)} className='cityInput text-white  p-2 ' type="text" placeholder="Enter City Name" />
              <div className='searchicon p-1' onChange={Search}><img src={seachicon} width={50} className='border rounded-4 bg-white' alt="searchIcon" /></div>
            </div>
          </div>

          <div><WeatherDetails timeZone={timeZone} icon={icon} inputref={inputref} sky={sky} temp={temp} city={city} country={country} latitude={latitude} longitude={longitude} humidity={humidity} wind={wind} loading={loading} />
          </div>

          <div className='copyright text-center'>Done by <a href="https://deepakdigitalcraft.tech/">Deepakkumar</a> </div>


        </div>

      }


    </>
  )
}
export default App


// Weathrer details function
const WeatherDetails = ({ timeZone, sky, icon, temp, country, city, latitude, longitude, humidity, wind, loading, inputref }) => {
  const [currentTime, setCurrentTime] = useState(new Date())

  // useEffect(()=>{

  //   console.log("eeeeee:",timeZone)
  // },[])


  const loaderanime = <div class="spinner-border " role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      return () => clearInterval(interval);
    }, [1000])

  }, [])

  // useEffect(() => {
  //     console.log("Time Zone Changed:", timeZone);
  // }, [timeZone]); // Only log when timeZone prop changes

  // const finaltimezone=`'${timeZone}'`

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

      {/* <div className='text-center'>{Hour}:{Miniute}:{Seconds}</div> */}

      <h5 className='text-center fw-bold text-warning'>
        {currentTime.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true, // Change to true for 12-hour format
          timeZone: timeZone
        })}
      </h5>

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

      <div className="data-container  d-flex justify-content-between mt-4 text-center">
        <div className="element d-flex flex-column justify-content-center align-items-center gap-1">
          <img width={30} src={humiditysky} alt="Humidity" />
          <div className='humidity-percent text-primary'>{loading ? loaderanime : <span className='fw-bold fs-4'> {humidity}%</span>}</div>
          <div className="weather-type " ref={inputref}>Humitidy</div>
        </div>

        <div className="element d-flex flex-column justify-content-center align-items-center gap-1">
          <img width={30} src={windsky} alt="Wind" />
          <div className='humidity-percent text-white'>{loading ? loaderanime : <span className='fw-bold fs-4 text-secondary'> {wind}km/h</span>}</div>
          <div className="weather-type " ref={inputref}>Wind Speed</div>
        </div>
      </div>

    </>
  )
}


