import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <section className="footer text-center">
        <Row>
          <Col xs={12} md={6} className='my-2'>
            <h3><Link to="/">CinemaFan</Link></h3>
          </Col>
          <Col xs={12} md={6} className='my-2'>
            <Nav
                className="justify-content-center"
            >
              <Nav.Link href="/movies">Фільми</Nav.Link>
              <Nav.Link href="/myTickets">Мої квитки</Nav.Link>
              <Nav.Link href="/about">Про нас</Nav.Link>
              <Nav.Link href="/contacts">Контакти</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} className='my-2'>
            <p>
            @2023 Сервіс онлайн купівлі квитків у кінотеатр CinemaFan
            <Link to="/"> cinemafan.com</Link>
            </p>
          </Col>
        </Row>
      </section>
    </footer>
  )
}

export default Footer;
