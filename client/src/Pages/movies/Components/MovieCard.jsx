import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function MovieCard({ movie, serverURL }) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={`${serverURL}/${movie.poster}`}
        alt={movie.title}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Subtitle>{movie.genre}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  serverURL: PropTypes.string.isRequired,
};

export default MovieCard;
