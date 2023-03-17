import axios from 'axios';
import env from 'react-dotenv'
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import WeatherCard from './components/Weathercard';
import Forecast from './components/Forecast';
import { Loader } from 'semantic-ui-react';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_URL2 = 'https://api.openweathermap.org/data/2.5/onecall'
const API_KEY=process.env.REACT_APP_API_KEY;


function App() {
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [city, setcity] = useState('');
  const [temperature, settemperature] = useState(null);
  const [humidity, sethumitidy] = useState(null);
  const [sunrise, setsunrise] = useState(null);
  const [sunset, setsunset] = useState(null);
  const [icon, seticon] = useState('');
  const [forecast, setforecast] = useState([]);
  const [loading,setloading]=useState(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlatitude(position.coords.latitude);
      setlongitude(position.coords.longitude);

    });
    axios.get(`${API_URL}?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${API_KEY}`)
      .then((Data) => {
        setloading(false);
        settemperature(Data.data.main.temp);
        setcity(Data.data.name);
        sethumitidy(Data.data.main.humidity);
        setsunrise(Data.data.sys.sunrise);
        setsunset(Data.data.sys.sunset);
        seticon(Data.data.weather[0].icon);
      })
      axios.get(`${API_URL2}?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${API_KEY}`)
      .then((Data)=>{
        setforecast(Data.data.daily);
      })

  }, [latitude, longitude]);
  return (
    <div className='main'>
      <Header />
      {loading ?(
        <div>
          <p>Loading ... Please</p>
          <Loader active inline='centered' />
          </div>
      ):(
        <WeatherCard
        temperature={temperature}
        humidity={humidity}
        sunrise={sunrise}
        sunset={sunset}
        city={city}
        icon={icon}
      />
      )}
      
      <Forecast forecast={forecast}/>
    </div>
  );
}

export default App;
