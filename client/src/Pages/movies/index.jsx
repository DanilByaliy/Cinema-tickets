import { Row, Col, Button } from 'react-bootstrap';
import MovieCard from './Components/MovieCard';
import serverURL from '../../constants/index';
import { useMovies } from '../../contexts/MoviesContext';

function MoviesPage() {
  const [movies, error] = useMovies();

  return !error ? (
    <main>
      <Row className="m-0">
        <Col xs={12} md={{ span: 10, offset: 1 }}>
          {movies.map((movie) => (
            <Row xs={1} lg={3} className="movie-row">
              <Col className="my-2">
                <MovieCard movie={movie} serverURL={serverURL} />
              </Col>
              <Col className="my-2">
                <span>Розклад Сеансів на сьогодні</span>
              </Col>
              <Col className="my-2">
                <Button variant="secondary">Купити квитки</Button>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </main>
  ) : (
    <h1>{error.message}</h1>
  );
}

export default MoviesPage;
