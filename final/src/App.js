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
  Input,
  InputGroup,
  Button,
  InputRightElement,
} from '@chakra-ui/react';
import { ImLocation } from 'react-icons/im';

import { getDecoderUrl, getAirQualityUrl } from './utils';
import './App.css';

const App = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [airQualityIndex, setAirQualityIndex] = useState(null);
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);

  // 1: getting the coordinates
  const getCoordinatesByLocation = async () => {
    try {
      const decoderUrl = getDecoderUrl(location);
      const coordinatesData = await fetch(decoderUrl);
      const coordinatesDataJSON = await coordinatesData.json();
      const { lon, lat, name } = coordinatesDataJSON[0];
      setCoordinates({ lon, lat, name });
    } catch (err) {
      console.error(err);
    }
  };

  // 2: getting the air quality data
  const getAirQualityDataByCoordinates = async () => {
    try {
      const airQualityUrl = getAirQualityUrl(coordinates.lat, coordinates.lon);
      const airQualityData = await fetch(airQualityUrl);
      const airQualityDataJSON = await airQualityData.json();
      const aqi = airQualityDataJSON.list[0].main.aqi;
      setAirQualityIndex(aqi);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (location) {
      getCoordinatesByLocation();
    }
  }, [location]);

  useEffect(() => {
    if (coordinates) {
      getAirQualityDataByCoordinates();
    }
  }, [coordinates?.name]);

  // 3: handle input change
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // 4: handle button click
  const handleClick = () => {
    setLocation(city);
  };
  return (
    <Container>
      <Center h={'100vh'}>
        <Card maxW="sm" p={8}>
          <CardBody>
            <Stack mt="6" spacing="3" style={{ width: '300px' }}>
              <InputGroup size="md">
                <Input
                  type={'text'}
                  placeholder="Type the city"
                  onChange={handleInputChange}
                />
                <InputRightElement width="4.5rem">
                  <Button size="sm" onClick={handleClick}>
                    {'Search'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Icon as={ImLocation} mr={1} />
                <Heading size="md">{coordinates?.name}</Heading>
              </Flex>
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Text mr={2}>The Air Quality Index is </Text>
                <Text fontSize="xl" color="blue.600">
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
