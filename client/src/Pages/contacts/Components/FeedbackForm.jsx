import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import axios from '../../../axios';
import serverURL from '../../../constants/index';

function FeedbackForm() {
  const url = `${serverURL}/feedback`;

  const defaultFormData = {
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(url, formData);
      setFormData(defaultFormData);
    } catch (error) {
      alert('Сталася помилка');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Form className="feedback" onSubmit={handleSubmit}>
      <Row className="m-4">
        <Form.Group className="my-2">
          <Form.Control
            type="text"
            placeholder="Введіть своє ім'я"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
            type="tel"
            placeholder="Введіть свій номер телефону"
            pattern="[0-9]{10}"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
            type="email"
            placeholder="Введіть свою пошту"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Введіть своє повідомлення"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="secondary">
            Відправити повідомлення
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
}

export default FeedbackForm;
