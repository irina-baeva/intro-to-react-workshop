import { useState, useEffect } from 'react';

const App = () => {
  const [coordinates, setCoordinates] = useState({});
  const [airQualityIndex, setAirQualityIndex] = useState(null);

  const LOCATION = 'bratislava';

  const GEO_DECODER_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${LOCATION}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
  const AIR_QUALITY_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

  // 1 step: getting the coordinates
  const getCoordinatesByLocation = async () => {
    try {
      const coordinatesData = await fetch(GEO_DECODER_URL);
      const coordinatesDataJSON = await coordinatesData.json();
      const { lon, lat, name } = coordinatesDataJSON[0];
      setCoordinates({ lon, lat, name });
    } catch (err) {
      console.error(err);
    }
  };

  // 2 step: getting the air quality data
  const getAirQualityDataByCoordinates = async () => {
    try {
      const airQualityData = await fetch(AIR_QUALITY_URL);
      const airQualityDataJSON = await airQualityData.json();
      const aqi = airQualityDataJSON.list[0].main.aqi;
      setAirQualityIndex(aqi);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoordinatesByLocation();
  }, []);

  useEffect(() => {
    if (coordinates.name) {
      getAirQualityDataByCoordinates();
    }
  }, [coordinates.name]);

  return (
    <div>
      <div>City: {LOCATION}</div>
      <div>Air Quality index level: {airQualityIndex} </div>
    </div>
  );
};

export default App;
