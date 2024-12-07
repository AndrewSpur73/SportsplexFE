import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

function RegisterForm() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    uid: user.fbUser.uid,
    userName: '',
    email: '',
    image: '',
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.fbUser.uid));
    router.push('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="userName" required placeholder="Enter A Username" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" required placeholder="Enter your Email" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="url" name="imageUrl" required placeholder="Enter an image URL" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    // imageUrl: PropTypes.string.isRequired,
    fbUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RegisterForm;
