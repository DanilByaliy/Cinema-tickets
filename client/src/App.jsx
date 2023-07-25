import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Router from './Router/index';
import Footer from './Components/Footer';
import { MoviesProvider } from './contexts/MoviesContext';

function App() {
  return (
    <div className="App">
      <Header />
      <MoviesProvider>
        <Router />
      </MoviesProvider>
      <Footer />
    </div>
  );
}

export default App;
