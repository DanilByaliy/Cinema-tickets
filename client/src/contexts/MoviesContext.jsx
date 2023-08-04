import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getMoviesByPage from '../services/moviesService';

const MoviesContext = createContext(undefined);

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMoviesByPage(1)
      .then((res) => setMovies(res.data.data))
      .catch((err) => setError(err));
  }, []);

  const value = useMemo(() => [movies, error], [movies, error]);

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

MoviesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useMovies = () => useContext(MoviesContext);
