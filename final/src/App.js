import { useState, useEffect } from 'react';

const App = () => {
  const [coordinates, setCoordinates] = useState({});

  const LOCATION = 'bratislava';

  const GEO_DECODER_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${LOCATION}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

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

  useEffect(() => {
    getCoordinatesByLocation();
  }, []);

  console.log(coordinates);

  return (
    <div>
      <div>City: {LOCATION}</div>
      <div>Air Quality index level: </div>
    </div>
  );
};

export default App;
