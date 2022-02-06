import React, { useState, useEffect } from 'react';
import { WeatherData, Search } from './components';

import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weatherDataMain, setWeatherDataMain] = useState([]);
  const [weatherDataDescription, setWeatherDataDescription] = useState([]);
  const [city, setCity] = useState('London');
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
  );
  

  const onSearchChange = (event) => {
    setCity(event.target.value);
  };

  const onClick = () => {
    setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url).then(response => response.json()); 

      setWeatherDataMain(result.main);
      setWeatherDataDescription(result.weather[0]);
      console.log(result);
    };
    
    fetchData();
  }, [url]);

  const celsius = (fTemp) => Math.round((fTemp - 273) * 100) / 100; //Converting fahrenheit scale into celsius scale
  const temperatureCelsius = `${celsius(weatherDataMain.temp)}°C`;

  const iconUrl = `http://openweathermap.org/img/wn/${weatherDataDescription.icon}@2x.png`;
  const icon = <img src={iconUrl} alt={weatherDataDescription.description}/>;

  return (
      <div className='weather-card'>
        <div>
          <div className='weather-card-elements'>
          <WeatherData 
            variableName = 'Temperature'
            variable = {temperatureCelsius}
          />
          <WeatherData 
            variableName = 'Description'
            variable = {weatherDataDescription.description}
            icon = {icon}
          />
          </div>
          <Search 
            value={city}
            onChange={onSearchChange}
            onClick={onClick}
          />
        </div>
      </div>
  );
}

export default App;
