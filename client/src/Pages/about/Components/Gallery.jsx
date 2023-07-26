import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CinemaImages from '../../../constants/CinemaImages';

function Gallery() {
  const [mainImage, setMainImage] = useState(CinemaImages[0]);

  const changeMainImage = (e) => {
    setMainImage({
      src: e.target.src,
      title: e.target.alt,
    });
  };

  return (
    <Container className="gallery">
      <Row className="d-none d-md-block gallery-main">
        <Col>
          <img src={mainImage.src} alt={mainImage.title} />
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="gallery-images">
        {CinemaImages.map((item) => (
          <Col>
            <div onClick={changeMainImage} aria-hidden="true">
              <img src={item.src} alt={item.title} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Gallery;
