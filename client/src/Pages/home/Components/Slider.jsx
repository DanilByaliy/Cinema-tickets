import Carousel from 'react-bootstrap/Carousel';
import { useMovies } from '../../../contexts/MoviesContext';
import serverURL from '../../../constants';

const ITEMS_IN_SLIDER = 5;

function Slider() {
  const [movies, error] = useMovies();

  const visibleMovies = movies.slice(0, ITEMS_IN_SLIDER);

  return (
    error || (
      <Carousel className="slider">
        {visibleMovies.map((item) => (
          <Carousel.Item key={item.id} className="slider-slide">
            <img
              className="d-block w-100"
              src={`${serverURL}/${item?.poster}`}
              alt={item?.title}
            />
            <Carousel.Caption className="slider-caption">
              <h3>{item?.title}</h3>
              <p>{item?.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  );
}

export default Slider;
