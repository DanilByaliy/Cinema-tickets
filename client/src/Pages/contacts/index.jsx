import { Col, Row } from 'react-bootstrap';
import Info from './Components/Info';
import FeedbackForm from './Components/FeedbackForm';

function ContactsPage() {
  return (
    <Row className="mx-0 my-4">
      <Col xs={12} md={6} className="p-4">
        <Info />
      </Col>
      <Col xs={12} md={6} className="p-4">
        <FeedbackForm />
      </Col>
    </Row>
  );
}

export default ContactsPage;
