import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToggleButton } from 'react-bootstrap';
import ImageKit from 'imagekit-javascript';
import { Image } from 'imagekitio-react';
// import { IKImage, IKContext, IKUpload } from 'imagekitio-react';

const ngosAddNewproject = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null);

  const [docid, setdocid] = useState(null);
  const [iseditlist, setIsedit] = useState(false);
  console.log(iseditlist, 12345);
  const { state, isedit } = useLocation();
  console.log(state, isedit, 'IIIIIIIIIIIIIIIIIIIIIIIIIIII');

  const privatekey = process.env.REACT_APP_IMAGEKIT_PRIVATE_KEY;
  console.log(privatekey, 123456);
  const uploadImage = async event => {
    console.log(event);
    const file = event;
    const fileName = 'qwerty';

    const urlEndpoint = 'https://ik.imagekit.io/fby/';
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const authenticationEndpoint = 'http://localhost:4000/auth';
    //-----------------------
    const ik = new ImageKit({
      publicKey: process.env.IMAGEKIT_PRIVATE_KEY,
      privateKey: process.env.IMAGEKIT_PUBLIC_KEY,
      // urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
      urlEndpoint: 'http://localhost:4000/auth'
    });

    try {
      const result = await ik.upload({
        file: file,
        fileName: fileName
      });
      setImage(result.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsedit(state?.isedit ? state?.isedit : false);
    if (state) {
      console.log(12345678);
      const { displayName, status, description, type, website, docID } =
        state.data;
      setProjectName(displayName);
      // setMagazineStatus(
      //   status === 'Active'
      //     ? { value: 1, label: 'Active' }
      //     : { value: 2, label: 'Inactive' }
      // );
      setDescription(description);
      setdocid(docID);
      // setType(type);
      // if (website !== 'undefined') {
      //   setWebsite(website);
      // }
    }
  }, [state]);

  const onSubmit = async e => {
    e.preventDefault();
    console.log(
      e,
      'logoUrllogoUrllogoUrllogoUrllogoUrllogoUrllogoUrl',
      logoUrl
    );
    const addNewProject = {
      displayName: projectName,
      description: description,
      logoUrl: 'logoUrl',
      tagline: 'tag',
      bannerUrl: 'ygtftf',
      // website: website,
      // contactEmail: emailId,
      // contactNumber: phonenum,
      status: status.label,
      docId: docid
    };
    console.log('Addngo', addNewProject);
    if (iseditlist) {
      await axios
        .put(
          `
      http://127.0.0.1:8000/projects/editProject/${addNewProject.docId}?updatedBy=${addNewProject.updatedOn}&displayName=${addNewProject.displayName}&description=${addNewProject.description}&tagline=${addNewProject.tagline}&logoUrl=${addNewProject.logoUrl}&bannerUrl=${addNewProject.bannerUrl}&contactName=${addNewProject.contactName}&contactEmail=${addNewProject.contactEmail}&contactNumber=${addNewProject.contactNumber}&website=${addNewProject.website}&parentNgoId=${addNewProject.parentNgoId}&status=${addNewProject.status}`
        )
        .then(res => {
          console.log(res);
          navigate('/ngos/ngo-wildlife-forever');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await axios
        .post(
          'http://127.0.0.1:8000/projects/createProject',
          {},
          { params: addNewProject }
          // 'http://127.0.0.1:8000/projects/createProject?displayName=ggu&description=guygyug&logoUrl=gg&status=ug'
          // 'http://127.0.0.1:8000/projects/createProject?displayName=ggu&description=guygyug&tagline=ugugu&logoUrl=gg&bannerUrl=gtg&contactName=gt&contactEmail=g&contactNumber=g&website=uuy&createdBy=yuy&updatedBy=yuyuuy&parentNgoId=yugyu&status=ug'
          // `http://127.0.0.1:8000/projects/create_project?displayName=${addNewProject.displayName}&description=${addNewProject.description}&tagline=${addNewProject.tagline}&logoUrl=${addNewProject.logoUrl}&contactName=${addNewProject.contactName}&contactEmail=${addNewProject.contactEmail}&contactNumber=${addNewProject.contactNumber}&website=${addNewProject.website}&createdBy=${addNewProject.createdBy}&updatedBy=${addNewProject.updatedBy}&parentNgoId=${addNewProject.parentNgoId}`
          // `http://127.0.0.1:8000/projects/create_project?displayName=${addNewProject.displayName}&description=${addNewProject.description}&tagline=tagline&logoUrl=https://picsum.photos/200/300&bannerUrl=https://picsum.photos/200/300&contactName=${addNewProject.contactName}&contactEmail=${addNewProject.contactEmail}&contactNumber=${addNewProject.contactNumber}&website=${addNewProject.website}&createdBy=${addNewProject.createdBy}&updatedBy=${addNewProject.updatedBy}&parentNgoId=${addNewProject.parentNgoId}`
        )
        .then(res => {
          console.log(res);
          navigate('/ngos/ngo-wildlife-forever');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const organizerOptions = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'Funding Started' },
    { value: '3', label: 'Funding Complete' }
  ];
  const [file, setFile] = useState(null);
  const onDrop = acceptedFiles => {
    console.log(
      acceptedFiles,
      'FFFFFFFFFFFFFFFFFFF',
      acceptedFiles.target.value
    );
    setFile(acceptedFiles[0]);
  };

  const handleImageUpload = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log(
      formData,
      'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      e.target.files[0]
    );

    axios
      .post('http://localhost:4000/auth', formData)
      .then(response => {
        console.log(
          response.data.url,
          'response.data.urlresponse.data.urlresponse.data.urlresponse.data.url'
        ); // handle the response here
        setLogoUrl(response.data.url);
      })
      .catch(err => console.log('BOOOOOOOOOOOOOOOOOOOOOOOOOOOOOMMMMMMMMMM'));
  };
  return (
    <>
      <Breadcrumb className="my-3">
        <Breadcrumb.Item href="/" className="text-700">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/manage-ngos" className="text-700">
          NGOs
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/ngos/ngo-wildlife-forever" className="text-700">
          WildLife Forever
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-700">
          Add Project
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            value={projectName}
            onChange={e => {
              setProjectName(e.target.value);
            }}
            placeholder="Project Name"
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Logo</Form.Label>
          <Form.Control
            type="file"
            value={logoUrl}
            onDrop={onDrop}
            onChange={e => {
              setLogoUrl(e.target.value);
              uploadImage(e.target.value);
            }}
          />
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Logo</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Banner Image</Form.Label>
          <Form.Control type="file" />
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
          <Form.Label>Status</Form.Label>
          <Select
            closeMenuOnSelect={false}
            options={organizerOptions}
            placeholder="Select Status"
            classNamePrefix="react-select"
            value={status}
            onChange={value => setStatus(value)}
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
            This is a featured Project
          </div>
        </div>
        <Button variant="primary" type="submit">
          Add Project
        </Button>
      </Form>
    </>
  );
};

export default ngosAddNewproject;
