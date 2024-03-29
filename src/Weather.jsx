import Day from './Day';

function Weather(props) {
  return (
  <>
  <Day date={props.weatherData.date} temperature={props.weatherData.temperature} description={props.weatherData.description}/>
  </>);
}

export default Weather;