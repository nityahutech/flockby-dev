import axios from 'axios';
import LoginForm from 'components/authentication/LoginForm';
import FalconCloseButton from 'components/common/FalconCloseButton';
import React, { useState } from 'react';
import Select from 'react-select';
import { Button, Form, Modal } from 'react-bootstrap';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';

const userInfoModal = () => {
  const navigate = useNavigate();
  const [lgShow, setLgShow] = useState(false);
  const [date, setDate] = useState(null);
  const location = useLocation();
  const [name, setName] = useState(location.state?.name || '');
  const [email, setEmail] = useState(
    location.state?.email || localStorage.getItem('email')
  );
  const [gender, setGender] = useState('');
  const [zipcode, setZipcode] = useState('');
  // const [dob, setDob] = useState('');

  const genderOpt = [
    { value: '1', label: 'Male' },
    { value: '2', label: 'Female' },
    { value: '3', label: 'Other' }
  ];
  // console.log(name);
  const onSubmit = async e => {
    e.preventDefault();
    const addUserInfo = {
      displayName: name,
      email: email,
      gender: gender.label,
      zipcode: zipcode,
      dob: date
    };
    console.log('userinfo', addUserInfo);
    await axios
      .post(
        `http://127.0.0.1:8000/users/createUser?UID=${
          location.state?.uid || localStorage.getItem('uid')
        }&email=${addUserInfo.email}&displayName=${
          addUserInfo.displayName
        }&gender=${addUserInfo.gender}&zipcode=${addUserInfo.zipcode}&dob=${
          addUserInfo.dob
        }&status=Active&hasAdminRole=false
    `
      )
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <Button onClick={() => setLgShow(true)} hidden>
        Large modal
      </Button>
      <Modal
        size="lg"
        show={true}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            User Information
          </Modal.Title>
          {/* <FalconCloseButton onClick={() => setLgShow(false)} /> */}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                disabled={location.state?.name}
                placeholder="Enter Name"
                // maxLength={6}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="text"
                value={email}
                disabled
                placeholder="Enter Name"
                // maxLength={6}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Gender</Form.Label>
              <Select
                closeMenuOnSelect={false}
                options={genderOpt}
                placeholder="Select Gender"
                classNamePrefix="react-select"
                value={gender}
                onChange={value => {
                  setGender(value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="number"
                value={zipcode}
                placeholder="Enter Zipcode"
                maxLength={6}
                minLength={6}
                onChange={e => {
                  setZipcode(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Label>DOB</Form.Label>
            <DatePicker
              selected={date}
              value={date}
              onChange={date => setDate(date)}
              className="form-control"
              placeholderText="DD-MM-YYYY"
              timeIntervals={5}
              dateFormat="dd-MM-yyyy"
              //   showTimeSelect
              fixedHeight
            />
            <Button variant="primary" type="submit" className="mt-2">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default userInfoModal;
