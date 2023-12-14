import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import downArrow from '../../assets/images/arrow-down.png';
import Slider from './Components/Slider';

function HomePage() {
  return (
    <main>
      <Row className="text-center m-0" xs={1}>
        <Col>
          <h2>Нові релізи</h2>
        </Col>
        <Col>
          <img src={downArrow} alt="turned down arrow" width="8%" />
        </Col>
        <Col>
          <Slider />
        </Col>
      </Row>
    </main>
  );
}

export default HomePage;
