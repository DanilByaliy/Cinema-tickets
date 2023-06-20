import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from 'prop-types';

function Navigation({title}) {
  return (
    <Navbar bg="light" variant="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/home">{title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="justify-content-end"
              style={{ maxHeight: '100px', width: '100%' }}
              navbarScroll
            >
              <Nav.Link href="/movies">Фільми</Nav.Link>
              <Nav.Link href="/myTickets">Мої квитки</Nav.Link>
              <Nav.Link href="/about">Про нас</Nav.Link>
              <Nav.Link href="/contacts">Контакти</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

Navigation.propTypes = {
  title: PropTypes.string.isRequired
};

export default Navigation;
