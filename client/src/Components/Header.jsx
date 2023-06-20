import Navigation from './Navigation';

function Header() {
  const title = 'CinemaFan';

  return (
    <header>
      <Navigation title={title}/>
    </header>
  );
}

export default Header;
