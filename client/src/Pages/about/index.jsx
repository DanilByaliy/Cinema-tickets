import { Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Gallery from './Components/Gallery';

function AboutPage() {
  return (
    <main>
      <Row className="m-0 text-center">
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Про нас</h2>
          <p>
            <strong>CinemaFan</strong> - це один із найкращих кінотеатрів,
            розташованих у місті Київ. Цей сайт призначений для перегляду
            квитків та їх продажу у режимі онлайн. Тут ви зможете дізнатись про
            актуальний список фільмів, які будуть доступні на нашому сайті, а
            також список майбутніх прем&#39;єр.
          </p>
          <p>
            Після того як ви визначились з фільмом, ви зможете придбати квитки
            на сеанс цього фільму. Якщо у вас виникли певні скарги, ви можете
            зв&#39;язатись з нами за допомогою розділу &#34;Контакти&#34;.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Gallery />
        </Col>
      </Row>
    </main>
  );
}

export default AboutPage;
