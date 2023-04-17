import React, { useState } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const addAdmin = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [email, setEmail] = useState('');
  const organizerOptions = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'Inactive' }
  ];
  const onSubmit = async e => {
    e.preventDefault();
    const addEmail = {
      email: email
    };
    console.log('eeeeeeeeeee', addEmail);
    await axios
      .post(`http://127.0.0.1:8000/users/assignAdmin?email=${addEmail.email}`, {
        manageAdmins: {
          status: 'true'
        }
      })
      .then(res => {
        console.log(res);
        navigate('/dashboard/manage-admin');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <Breadcrumb className="my-3">
        <Breadcrumb.Item href="/" className="text-700">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/manage-admin" className="text-700">
          Manage Admins
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-700">
          Add Admin
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter Email Address"
            className="w-50"
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Add
        </Button>
      </Form>
    </>
  );
};

export default addAdmin;
