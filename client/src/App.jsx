import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import MoviesPage from './Pages/movies';

function App() {
  return (
    <div className="App">
      <Header />
      <MoviesPage />
    </div>
  );
}

export default App;
