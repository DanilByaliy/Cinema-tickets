import { Routes, Route } from 'react-router-dom';
import MoviesPage from '../Pages/movies';

function Router() {
  return (
    <Routes>
      <Route path="/movies" element={<MoviesPage />} />
    </Routes>
  );
}

export default Router;
