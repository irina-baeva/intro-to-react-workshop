export const getDecoderUrl = (location) => {
  return `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
};

export const getAirQualityUrl = (lat, lon) => {
  return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
};
