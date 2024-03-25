import Card from 'react-bootstrap/Card';

function Weather(props) {
  return <Card>Date: {`${props.weatherData.date}`} Weather: {`${props.weatherData.description}`}</Card>;
}

export default Weather;