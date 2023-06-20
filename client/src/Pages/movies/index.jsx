import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import getMovies from '../../services/moviesService';
import MovieCard from './Components/MovieCard';
import serverURL from '../../constants/index';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies('/movies', 1)
      .then((res) => setMovies(res.data.data))
      .catch((err) => setError(err));
  }, []);

  return !error ? (
    <main>
      <Row>
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
