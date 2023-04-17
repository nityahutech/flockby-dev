import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToggleButton } from 'react-bootstrap';
// import { ContextExclusionPlugin } from 'webpack';
const addNgos = () => {
  const [checked, setChecked] = useState(false);
  const [ngoName, setNgoName] = useState('');
  const [ngoTagline, setNgoTagline] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [website, setWebsite] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const [magazineid, setMagazineid] = useState(null);
  const [iseditlist, setIsedit] = useState(false);
  console.log(iseditlist, 12345);
  const { state, isedit } = useLocation();
  console.log(state, magazineid, 'IIIIIIIIIIIIIIIIIIIIIIIIIIII');

  useEffect(() => {
    setIsedit(state?.isedit ? state?.isedit : false);
    if (state) {
      console.log(12345678);
      const {
        displayName,
        status,
        tagline,
        logoUrl,
        contactNumber,
        contactEmail,
        description,
        website,
        docID
      } = state.data;

      setNgoName(displayName);
      // setLogoUrl(logoUrl);
      setNgoTagline(tagline);
      setStatus(
        status === 'Active'
          ? { value: 1, label: 'Active' }
          : { value: 2, label: 'Inactive' }
      );
      setPhonenum(contactNumber);
      setDescription(description);
      setMagazineid(docID);
      setEmailId(contactEmail);
      if (website !== 'undefined') {
        setWebsite(website);
      }
    }
  }, [state]);
  console.log(status);
  const onSubmit = async e => {
    e.preventDefault();
    // console.log(value);
    const addNgoData = {
      displayName: ngoName,
      tagline: ngoTagline,
      description: description,
      logoUrl: 'logoUrl',
      website: website,
      contactEmail: emailId,
      contactNumber: phonenum,
      status: status.label,
      docid: magazineid
    };
    console.log('aaaaaaaaa', addNgoData);

    if (iseditlist) {
      await axios
        .put(
          `http://127.0.0.1:8000/ngos/update_ngo?docID=${
            addNgoData.docid
          }&updatedBy=${null}&displayName=${
            addNgoData.displayName
          }&description=${addNgoData.description}&tagline=${
            addNgoData.type
          }&logoUrl=${addNgoData.logoUrl}&contactName=${
            addNgoData.contactNumber
          }&contactEmail=${addNgoData.contactEmail}&contactNumber=${
            addNgoData.contactNumber
          }&website=${addNgoData.website}&createdBy=${null}&status=${
            addNgoData.status
          }`,
          {
            bannerUrl: ['string'],
            associatedMagazines: ['string'],
            associatedProjects: ['string']
          }
        )
        .then(res => {
          console.log(res);
          navigate('/dashboard/manage-ngos');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await axios
        .post(
          `http://127.0.0.1:8000/ngos/create_ngo?displayName=${addNgoData.displayName}&description=${addNgoData.description}&tagline=${addNgoData.tagline}&logoUrl=${addNgoData.logoUrl}&contactName=${addNgoData.contactName}&contactEmail=${addNgoData.contactEmail}&contactNumber=${addNgoData.contactNumber}&website=${addNgoData.website}&createdBy=" "&updatedBy=" "&status=${addNgoData.status}`
          // {
          //   bannerUrl: ['string'],
          //   associatedMagazines: ['string'],
          //   associatedProjects: ['string']
          // }
        )
        .then(res => {
          console.log(res);
          navigate('/dashboard/manage-ngos');
        })
        .catch(error => {
          console.log(error);
        });
      console.warn(
        ngoName,
        ngoTagline,
        description,
        website,
        emailId,
        phonenum
      );
    }
  };
  const organizerOptions = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'Inactive' }
  ];
  return (
    <>
      <Breadcrumb className="my-3">
        <Breadcrumb.Item href="/" className="text-700">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/dashboard/manage-ngos" className="text-700">
          Manage NGOs
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-700">
          Add NGO
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>NGO Name</Form.Label>
          <Form.Control
            type="text"
            value={ngoName}
            placeholder="NGO Name"
            onChange={e => {
              setNgoName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>NGO Tagline</Form.Label>
          <Form.Control
            type="text"
            value={ngoTagline}
            placeholder="NGO Tagline"
            onChange={e => {
              setNgoTagline(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            rows={3}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Logo</Form.Label>
          <Form.Control
            type="file"
            value={logoUrl}
            onChange={e => {
              setLogoUrl(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Banner Image</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            value={website}
            placeholder="Website Url"
            onChange={e => {
              setWebsite(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Contact Person's Email id</Form.Label>
          <Form.Control
            type="email"
            value={emailId}
            placeholder="Email Id"
            onChange={e => {
              setEmailId(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Contact Person's Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phonenum}
            placeholder="+01-9999999999"
            onChange={e => {
              setPhonenum(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Select
            closeMenuOnSelect={false}
            options={organizerOptions}
            placeholder="Select Status"
            classNamePrefix="react-select"
            value={status}
            onChange={status => setStatus(status)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Public Registry ID for NGO</Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>
        <div className="d-flex mb-2">
          <ToggleButton
            className="mb-2 none"
            id="toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={checked}
            value="1"
            onChange={e => setChecked(e.currentTarget.checked)}
          ></ToggleButton>
          <div style={{ fontSize: '10px', fontWeight: 400 }}>
            This is a featured NGOs
          </div>
        </div>
        <Button variant="primary" type="submit">
          Add NGO
        </Button>
      </Form>
    </>
  );
};

export default addNgos;
