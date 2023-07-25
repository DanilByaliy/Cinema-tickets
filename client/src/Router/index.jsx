import { Routes, Route } from 'react-router-dom';
import MoviesPage from '../Pages/movies/index';
import ContactsPage from '../Pages/contacts/index';
import HomePage from '../Pages/home/index';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
    </Routes>
  );
}

export default Router;
