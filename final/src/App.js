import { useState, useEffect } from 'react';
import {
  Stack,
  Container,
  Card,
  Icon,
  CardBody,
  Text,
  Heading,
  Center,
  Flex,
} from '@chakra-ui/react';
import { ImLocation } from 'react-icons/im';
import './App.css';

const App = () => {
  const [coordinates, setCoordinates] = useState({});
  const [airQualityIndex, setAirQualityIndex] = useState(null);

  const LOCATION = 'Bratislava';

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
    <Container>
      <Center h={'100vh'}>
        <Card maxW="sm" p={8}>
          <CardBody>
            <Stack mt="6" spacing="3">
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Icon as={ImLocation} mr={1} />
                <Heading size="md">{LOCATION}</Heading>
              </Flex>
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Text mr={2}>The Air Quality Index is </Text>
                <Text fontSize="xl" color='blue.600'>
                  {airQualityIndex}
                </Text>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </Container>
  );
};

export default App;
