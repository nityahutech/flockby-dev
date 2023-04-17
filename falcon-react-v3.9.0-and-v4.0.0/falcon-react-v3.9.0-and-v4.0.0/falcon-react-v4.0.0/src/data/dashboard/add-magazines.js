import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToggleButton } from 'react-bootstrap';

const addMagazines = () => {
  const [checked, setChecked] = useState(false);
  const [magazineName, setMagazineName] = useState('');
  const [magazineTagline, setMagazineTagline] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [website, setWebsite] = useState('');
  const [magazineStatus, setMagazineStatus] = useState('');
  const [type, setType] = useState('');
  const [magazineid, setMagazineid] = useState(null);
  const [iseditlist, setIsedit] = useState(false);
  console.log(iseditlist, 12345);
  const { state, isedit } = useLocation();
  console.log(state, isedit, 'IIIIIIIIIIIIIIIIIIIIIIIIIIII');

  useEffect(() => {
    setIsedit(state?.isedit ? state?.isedit : false);
    if (state) {
      console.log(12345678);
      const {
        displayName,
        status,
        description,
        type,
        tagline,
        website,
        docID
      } = state.data;
      setMagazineName(displayName);
      setMagazineStatus(
        status === 'Active'
          ? { value: 1, label: 'Active' }
          : { value: 2, label: 'Inactive' }
      );
      setDescription(description);
      setMagazineid(docID);
      setMagazineTagline(tagline);
      setType(type);
      if (website !== 'undefined') {
        setWebsite(website);
      }
    }
  }, [state]);

  console.log(type);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const organizerOptions = [
    { value: '1', label: 'Media' },
    { value: '2', label: 'Category' },
    { value: '3', label: 'Topic' }
  ];
  const organizerOptionsMulti = [
    { value: '1', label: 'Category 1' },
    { value: '2', label: 'Category 2' }
  ];
  const statusData = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];
  const onSubmit = async e => {
    e.preventDefault();

    const addMagazine = {
      displayName: magazineName,
      tagline: magazineTagline,
      description: description,
      logoUrl: 'logoUrl',
      type: type.label,
      status: magazineStatus,
      magazineid: magazineid
    };
    console.log('magazinnnnn', addMagazine);

    if (iseditlist) {
      await axios
        .put(
          `http://127.0.0.1:8000/magazines/editMagazine?magazine_id=${
            addMagazine.magazineid
          }&updatedBy=${null}&displayName=${
            addMagazine.displayName
          }&description=${addMagazine.description}&type=${
            addMagazine.type
          }&logoUrl=${addMagazine.logoUrl}&tagline=${
            addMagazine.tagline
          }&contactName=${addMagazine.contactName}&contactEmail=${
            addMagazine.contactEmail
          }&contactNumber=${addMagazine.contactNumber}&website=${
            addMagazine.website
          }&associatedCategoryId=${
            addMagazine.associatedCategoryId
          }&createdBy=${addMagazine.createdBy}&associatedNgoId=${
            addMagazine.associatedNgoId
          }&updatedBy=" "&magazineStatus=${addMagazine.status}`
          // ['string']
        )
        .then(res => {
          console.log(res);
          navigate('/dashboard/manage-magazines');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await axios
        .post(
          `http://127.0.0.1:8000/magazines/createMagazine?displayName=${addMagazine.displayName}&description=${addMagazine.description}&type=${addMagazine.type}&logoUrl=${addMagazine.logoUrl}&tagline=${addMagazine.tagline}&contactName=${addMagazine.contactName}&contactEmail=${addMagazine.contactEmail}&contactNumber=${addMagazine.contactNumber}&website=${addMagazine.website}&associatedCategoryId=${addMagazine.associatedCategoryId}&createdBy=${addMagazine.createdBy}&associatedNgoId=${addMagazine.associatedNgoId}&updatedBy=" "&magazineStatus=${addMagazine.status}`,
          ['string']
        )
        .then(res => {
          console.log(res);
          navigate('/dashboard/manage-magazines');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Breadcrumb className="my-3">
        <Breadcrumb.Item href="/" className="text-700">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="/dashboard/manage-magazines"
          className="text-700"
        >
          Manage Magazines
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-700">
          Add Magazines
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Magazine Name</Form.Label>
          <Form.Control
            type="text"
            name="bbb"
            value={magazineName}
            placeholder="Magazine Name"
            onChange={e => {
              setMagazineName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Magazine Tagline</Form.Label>
          <Form.Control
            type="text"
            value={magazineStatus}
            placeholder="Magazine Tagline"
            onChange={e => {
              setMagazineStatus(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Logo</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Banner Image</Form.Label>
          <Form.Control
            type="file"
            value={logoUrl}
            onChange={e => {
              setLogoUrl(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Magazine Type</Form.Label>
          <Select
            closeMenuOnSelect={false}
            options={organizerOptions}
            placeholder="Select magazine Type"
            classNamePrefix="react-select"
            value={type}
            onChange={value => {
              console.log(value);
              setType(value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>If Category Magazine</Form.Label>
          <Select
            closeMenuOnSelect={false}
            options={organizerOptionsMulti}
            placeholder="Select Category"
            isMulti
            classNamePrefix="react-select"
            value={category}
            onChange={value => {
              setCategory(value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            value={website}
            onChange={e => {
              setWebsite(e.target.value);
            }}
            placeholder="If media magazine"
          />
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
            This is a featured Magazine
          </div>
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default addMagazines;
