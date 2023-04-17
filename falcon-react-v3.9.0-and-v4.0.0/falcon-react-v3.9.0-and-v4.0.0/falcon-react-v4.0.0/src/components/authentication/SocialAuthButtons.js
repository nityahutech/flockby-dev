import React from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from 'firebaseConfig';
import SignUpModal from 'data/dashboard/info-modal/checkUserData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SocialAuthButtons = () => {
  const provider = new GoogleAuthProvider();
  // SignUpModal('7oecBNczW91zcAjpHli');
  const navigate = useNavigate();

  const handlesignin = () => {
    console.log('pressd');
    signInWithPopup(auth, provider)
      .then(res => {
        console.log(res);
        console.log(res.user.uid);
        checking(res);
      })
      .catch(err => console.log(err));
  };
  // signInWithEmailAndPassword(auth, email, password)
  // createUserWithEmailAndPassword(auth, email, password)
  const checking = async res => {
    try {
      let exists = await axios.get(
        `http://127.0.0.1:8000/users/${res.user.uid}`
      );
      console.log(exists);
      navigate('/');
    } catch (err) {
      console.log(err);
      console.log(err.message);
      if (err?.response?.status == 200) {
        navigate('/');
      } else if (err?.response?.status == 404) {
        navigate('/info-modal/user-info-modal', {
          state: {
            name: res._tokenResponse.displayName,
            email: res._tokenResponse.email,
            uid: res.user.uid
          }
        });
      } else {
        alert('failed');
      }
    }
  };

  return (
    <Form.Group className="mb-0">
      <Row>
        <Col sm={6} className="pe-sm-1">
          <Button
            variant=""
            size="sm"
            className="btn-outline-google-plus mt-2 w-100"
            onClick={handlesignin}
          >
            <FontAwesomeIcon
              icon={['fab', 'google-plus-g']}
              transform="grow-8"
              className="me-2"
            />{' '}
            google
          </Button>
        </Col>
        <Col sm={6} className="ps-sm-1">
          <Button
            variant=""
            size="sm"
            className="btn-outline-facebook mt-2 w-100"
          >
            <FontAwesomeIcon
              icon={['fab', 'facebook-square']}
              transform="grow-8"
              className="me-2"
            />{' '}
            facebook
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default SocialAuthButtons;
