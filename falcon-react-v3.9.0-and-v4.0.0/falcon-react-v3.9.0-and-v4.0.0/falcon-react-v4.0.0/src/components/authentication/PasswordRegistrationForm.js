import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from 'firebaseConfig';

const PasswordRegistrationForm = ({ hasLabel }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // const provider = new GoogleAuthProvider();
  // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAccepted: false
  });

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(res => {
        console.log(res.user.uid);
        // checking(res.user.uid);
        navigate('/info-modal/user-info-modal', {
          state: { name: formData.name }
        });
      })
      .catch(err => console.log(err));
  };
  // const checking = async id => {
  //   // try {
  //   //   let exists = await axios.get(`http://127.0.0.1:8000/users/${id}`);
  //   //   console.log(exists);

  //   //   // navigate('/');
  //   // } catch (err) {
  //   //   console.log(err);
  //   //   console.log(err.message);
  //   //   if (err?.response?.status == 200) {
  //   //     navigate('/');
  //   //     toast.success(`Successfully registered as ${formData.name}`, {
  //   //       theme: 'colored'
  //   //     });
  //   //   } else
  //     // if (err?.response?.status == 404) {
  //       navigate('/info-modal/user-info-modal', {
  //         state: { name: formData.name }
  //       });
  //     } else {
  //       alert('failed');
  //     }
  //   }
  // };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Name</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Name' : ''}
          value={formData.name}
          name="name"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group> */}

      {/* <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="text"
        />
      </Form.Group> */}
      <Form.Group>
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      {/* <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Password' : ''}
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Confirm Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
      </Row> */}

      <Form.Group className="mb-3">
        {/* <Form.Check type="checkbox" id="acceptCheckbox" className="form-check">
          <Form.Check.Input
            type="checkbox"
            name="isAccepted"
            checked={formData.isAccepted}
            onChange={e =>
              setFormData({
                ...formData,
                isAccepted: e.target.checked
              })
            }
          />
          <Form.Check.Label className="form-label">
            I accept the <Link to="#!">terms</Link> and{' '}
            <Link to="#!">privacy policy</Link>
          </Form.Check.Label>
        </Form.Check> */}
      </Form.Group>

      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
          disabled={
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.isAccepted
          }
        >
          Confirm Password
        </Button>
      </Form.Group>
      {/* <Divider>or register with</Divider> */}

      {/* <SocialAuthButtons /> */}
    </Form>
  );
};

PasswordRegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default PasswordRegistrationForm;
