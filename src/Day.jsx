import Card from 'react-bootstrap/Card';

function Day(props) {
  return (
  <>
  <Card>Date: {`${props.date}`}</Card>
  <Card>Temperature: {`${props.temperature}`}</Card>
  <Card>Weather: {`${props.description}`}</Card>
  </>);
}

export default Day;