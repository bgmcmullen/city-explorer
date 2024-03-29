import Movie from './Movie';

function Movies(props) {
  return (
  <>
    {props.movieData.map((movie, index) => (
    <>
      <Movie index={index} title={movie.title} overview={movie.overview} vote_average={movie.vote_average} vote_count={movie.vote_count} popularity={movie.popularity} release_date={movie.release_date}/>
      </>
    ))}
  </>);
}

export default Movies;