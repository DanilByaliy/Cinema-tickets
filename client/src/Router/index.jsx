import { Routes, Route } from 'react-router-dom';
import MoviesPage from '../Pages/movies';
import ContactsPage from '../Pages/contacts';

function Router() {
  return (
    <Routes>
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
    </Routes>
  );
}

export default Router;
