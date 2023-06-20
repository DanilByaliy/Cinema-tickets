import Navigation from './Navigation';
import Presentation from './Presentation';

function Header() {
  const title = 'CinemaFan';

  return (
    <header>
      <Navigation title={title} />
      <Presentation title={title} />
    </header>
  );
}

export default Header;
