import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import PasswordRegistrationForm from './PasswordRegistrationForm';
import SocialAuthButtons from './SocialAuthButtons';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from 'firebaseConfig';

const RegistrationForm = ({ hasLabel }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('email');
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

  const passwordSubmit = async () => {
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      sendEmailVerification(res.user);
      localStorage.setItem('uid', res.user.uid);
      localStorage.setItem('email', email);
      toast.success(
        `Your account has been created. Please follow the link sent to ${email}`
      );
      // navigate('/info-modal/user-info-modal', {
      //   state: { email: email, uid: res.user.uid, disabled: false }
      // });
    } catch (err) {
      alert('failed');
    }
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // createUserWithEmailAndPassword(auth, formData.email, formData.password)
    //   .then(res => {
    //     console.log(res.user.uid);
    //     // checking(res.user.uid);
    //     navigate('/info-modal/user-info-modal', {
    //       state: { name: formData.name }
    //     });
    //   })
    //   .catch(err => console.log(err));
    try {
      // toast.success(`Logged in as ${formData.email}`, {
      //   theme: 'colored'
      // });
      // let [exists, isAdmin] = await Promise.all([
      //   axios.get(`http://127.0.0.1:8000/users/${id}`),
      //   axios.get(`http://127.0.0.1:8000/users/isAdmin`, {
      //     email: 'test@test.com'
      //   })
      // ]);
      // let exists = await axios.get(`http://127.0.0.1:8000/users/${id}`);
      console.log('ddddddddddddddddddd', email);
      await signInWithEmailAndPassword(auth, email, '!');
    } catch (err) {
      console.log(err);
      // console.log(err.message);
      // // if (err?.response?.status == 200) {
      // //   navigate('/');
      // // } else
      if (err.code == 'auth/wrong-password') {
        // alert('User already exists!');
        toast.success('User Already exists, Please Login');
        navigate('/authentication/card/login', { state: { email: email } });
      } else if (err.code == 'auth/user-not-found') {
        setPage('password');
        console.log('ffffffffffff');
      } else {
        //print error
      }
    }
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
      email: e.target.value
    });
  };

  console.log(formData);
  return (
    <Form>
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
      {/* {email ? (
        <PasswordRegistrationForm />
      ) : ( */}
      <>
        {page == 'email' ? (
          <>
            <Form.Group className="mb-3">
              {hasLabel && <Form.Label>Email address</Form.Label>}
              <Form.Control
                placeholder={!hasLabel ? 'Email address' : ''}
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                // onChange={handleFieldChange}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Button
                // onClick={() => {
                //   setEmail(true);
                // }}
                className="w-100"
                // type="submit"
                onClick={handleSubmit}
                disabled={!email}
              >
                Verify Email
              </Button>
            </Form.Group>
          </>
        ) : null}
        {page == 'password' ? (
          <>
            <Form.Group className="mb-3">
              {hasLabel && <Form.Label>Password</Form.Label>}
              <Form.Control
                placeholder={!hasLabel ? 'Password' : ''}
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                // onChange={handleFieldChange}
                type="password"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Button
                // onClick={() => {
                //   setEmail(true);
                // }}
                className="w-100"
                // type="submit"
                onClick={passwordSubmit}
                disabled={!password}
              >
                Submit Password
              </Button>
            </Form.Group>
          </>
        ) : null}

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

        {/* <Form.Group className="mb-3">
        <Form.Check type="checkbox" id="acceptCheckbox" className="form-check">
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
        </Form.Check>
      </Form.Group> */}
      </>
      {/* )} */}
      {/* <Divider>or register with</Divider> */}

      {/* <SocialAuthButtons /> */}
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
