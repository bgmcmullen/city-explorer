import Card from 'react-bootstrap/Card';

function Weather(props) {
  return (
  <>
  <Card>Date: {`${props.weatherData.date}`}</Card>
  <Card>Temperature: {`${props.weatherData.temperature} °C`}</Card>
  <Card>Weather: {`${props.weatherData.description}`}</Card>
  </>);
}

export default Weather;