import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

function Presentation({ title }) {
  return (
    <Row className="presentation">
      <Col xs={12} md={{ span: 6, offset: 3 }}>
        <p>
          <strong>{title}</strong> - найкращий вибір для любителів кіно. У нас
          ви зможете знайти фільми на будь-який смак. Квитки можна придбати
          онлайн або на касі. Завітайте до нас у середу та оримайте
          <em>квитки за півціни!</em>
        </p>
      </Col>
    </Row>
  );
}

Presentation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Presentation;
