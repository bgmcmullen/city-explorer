import Card from 'react-bootstrap/Card';

function Movie(props) {
  return (
    <><Card key={props.index} style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{props.overview}</Card.Subtitle>
      <Card.Text>Average votes: {props.vote_average}</Card.Text>
      <Card.Text>Vote Count: {props.vote_count}</Card.Text>
      <Card.Text>Popularity: {props.popularity}</Card.Text>
      <Card.Text>Released on: {props.release_date}</Card.Text>
    </Card.Body>
  </Card></>);
}

export default Movie;