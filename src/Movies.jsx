import Card from 'react-bootstrap/Card';

function Movies(props) {
  return (
  <>
    {props.movieData.map((movie , index) => (
      <><Card key={index} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{movie.overview}</Card.Subtitle>
          <Card.Text>Average votes: {movie.vote_average}</Card.Text>
          <Card.Text>Vote Count: {movie.vote_count}</Card.Text>
          <Card.Text>Popularity: {movie.popularity}</Card.Text>
          <Card.Text>Released on: {movie.release_date}</Card.Text>
        </Card.Body>
      </Card></>
      
      
    ))}
  </>);
}

export default Movies;