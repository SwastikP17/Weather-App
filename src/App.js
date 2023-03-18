import axios from 'axios';
// import env from 'react-dotenv'
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import WeatherCard from './components/Weathercard';
import Forecast from './components/Forecast';
import { Loader } from 'semantic-ui-react';
import image1 from './images/01d.jpg';
import image2 from './images/03d.jpg';
import image3 from './images/10d.jpg';
import image4 from './images/11d.jpg';
import image5 from './images/50d.jpg';

import image6 from './images/01n.jpg';
import image7 from './images/03n.jpg';
import image8 from './images/10n.jpg';
import image9 from './images/11d.jpg';
import image10 from './images/50n.jpg';

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
  let imagefinal=''
  switch (`${icon}`) {
    case "01d":
        imagefinal=image1
      break;
    case "03d":
        imagefinal=image2
      break;
    case "10d":
        imagefinal=image3
      break;
    case "11d":
        imagefinal=image4
      break;
    case "50d":
        imagefinal=image5
      break;
    case "01n":
        imagefinal=image6
      break;
    case "03n":
        imagefinal=image7
      break;
    case "10n":
        imagefinal=image8
      break;
    case "11n":
        imagefinal=image9
      break;
    case "50n":
        imagefinal=image10
      break;
  
    default: imagefinal=image1
      break;
  }
  return (
    <div className='main' style={{backgroundImage:`url(${imagefinal})`}} >
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
