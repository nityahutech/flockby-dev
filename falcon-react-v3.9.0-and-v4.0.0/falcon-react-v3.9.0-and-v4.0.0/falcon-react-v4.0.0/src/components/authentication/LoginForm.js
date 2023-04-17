import Divider from 'components/common/Divider';
import axios from 'axios';
import {
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from 'firebaseConfig';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SocialAuthButtons from './SocialAuthButtons';

const LoginForm = ({ hasLabel, layout }) => {
  let navigate = useNavigate();
  const location = useLocation();
  // const provider = new GoogleAuthProvider();

  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(res => {
        console.log(res.user.uid);
        checking(res);
      })
      .catch(err => {
        let message = err.message;
        switch (err.code) {
          case 'auth/wrong-password':
            message = 'Incorrect Password!';
            break;
          case 'auth/user-not-found':
            message = 'User does not exist!';
            break;
          case 'auth/user-disabled':
            message = 'This account is deactivated.';
            break;
          case 'auth/invalid-email':
            message = 'Enter valid email!';
            break;
          case 'auth/internal-error':
            message = 'Enter a password!';
            break;
        }
        toast.error(message);
      });

    // navigate('/');
  };
  const checking = async res => {
    try {
      // let [exists, isAdmin] = await Promise.all([
      //   axios.get(`http://127.0.0.1:8000/users/${res.user.uid}`),
      //   axios.get(`http://127.0.0.1:8000/users/isAdmin`, {
      //     email: 'test@test.com'
      //   })
      // ]);
      let exists = await axios.get(
        `http://127.0.0.1:8000/users/${res.user.uid}`
      );
      if (res.user.emailVerified) {
        toast.success(`Logged in as ${formData.email}`, {
          theme: 'colored'
        });
        navigate('/');
      } else {
        sendEmailVerification(res.user);
        localStorage.setItem('uid', res.user.uid);
        localStorage.setItem('email', formData.email);

        toast.error(
          `Your email has not been verified. Please follow the link send to ${formData.email}`,
          {
            theme: 'colored'
          }
        );
      }

      // console.log(exists, isAdmin);
    } catch (err) {
      console.log(err);
      console.log(err.message);
      // if (err?.response?.status == 200) {
      //   navigate('/');

      // } else
      if (err?.response?.status == 404) {
        navigate('/info-modal/user-info-modal', {
          state: {
            email: formData.email,
            uid: res.user.uid,
            name: res.user.displayName
          }
        });
        localStorage.getItem(email);
      } else {
        alert('failed');
      }
    }
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // console.log(formData);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          defaultValue={location.state?.email || ''}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs--1 mb-0"
            to={`/authentication/${layout}/forgot-password`}
          >
            Forgot Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          Log in
        </Button>
      </Form.Group>

      <Divider className="mt-4">or log in with</Divider>

      <SocialAuthButtons />
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
