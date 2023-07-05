import { Col, Row } from 'react-bootstrap';
import Info from './Components/Info';

function ContactsPage() {
  return (
    <Row className="mx-0 my-4">
      <Col xs={12} md={6} className="p-4">
        <Info />
      </Col>
    </Row>
  );
}

export default ContactsPage;
