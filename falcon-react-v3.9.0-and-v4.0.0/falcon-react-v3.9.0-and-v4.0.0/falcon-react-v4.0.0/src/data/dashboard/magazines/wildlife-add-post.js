import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToggleButton } from 'react-bootstrap';
const wildlifeAddPost = () => {
  const navigate = useNavigate();
  // const [value, setValue] = useState(null);
  // const [valueProject, setValueProject] = useState(null);
  const [checked, setChecked] = useState(false);
  const [magazineid, setMagazineid] = useState(null);
  const [type, setType] = useState(null);
  const [iseditlist, setIsedit] = useState(false);
  console.log(iseditlist, 12345);
  const { state, isedit } = useLocation();
  const [postLinkInput, setPostLinkInput] = useState(false);
  console.log(state, isedit, 'IIIIIIIIIIIIIIIIIIIIIIIIIIII');
  const organizerOptionsMulti = [
    { value: '1', label: 'Project 1' },
    { value: '2', label: 'Projecr 2' }
  ];

  const [formBody, setFormBody] = useState({
    imgUrl: [],
    videoUrl: [],
    bgUrl: [],
    associatedProjects: []
  });
  const [formData, setFormData] = useState({
    title: null,
    bodyText: null,
    type: null,
    createdBy: null,
    magazineId: null,
    totalGivenAmount: null,
    totalReactionCount: null,
    totalGiveCount: null,
    totalShareCount: null,
    status: null
  });

  useEffect(() => {
    setIsedit(state?.isedit ? state?.isedit : false);
    if (state) {
      console.log(' state.data', state.data);
      const { postTitle, status, postId, type, bodyText } = state.data;
      setFormData({
        ...formData,
        title: postTitle,
        status:
          status === 'Active'
            ? { value: 'active', label: 'Active' }
            : { value: 'inactive', label: 'Inactive' },
        type:
          type === 'External Link'
            ? {
                value: 'External Link',
                label: 'External Link'
              }
            : { value: 'Content', label: 'Content' }
      });
      console.log(formData, 'DDDDDDDDDDDD');
      setMagazineid(postId);
      setType(type);
      // setType(type);
      // if (website !== 'undefined') {
      //   setWebsite(website);
      // }
    }
  }, [state]);

  const postType = [
    {
      value: 'External Link',
      label: 'External Link'
    },
    { value: 'Content', label: 'Content' }
  ];
  const organizerOptions = [
    {
      value: 'active',
      label: 'Active'
    },
    { value: 'inactive', label: 'Inactive' }
  ];
  // const organizerOptionsProject = [
  //   {
  //     value: 'Massachusetts Institute of Technology',
  //     label: 'Massachusetts Institute of Technology'
  //   },
  //   { value: 'University of Chicago', label: 'University of Chicago' }
  // ];

  const savePost = async e => {
    console.log({ formData, formBody });
    e.preventDefault();
    if (iseditlist) {
      await axios
        .put(`http://127.0.0.1:8000/posts/editPost`, formBody, {
          params: { formData }
        })
        .then(res => {
          console.log(res);
          navigate('/magazines/wildlife-forever');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('formData', formData);
      axios
        .post(`http://127.0.0.1:8000/posts/createPost`, formBody, {
          params: {
            ...formData,
            status: formData?.status?.value,
            type: formData?.type?.value
          }
        })
        .then(res => {
          console.log(res);
          navigate('/magazines/wildlife-forever');
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
          Magazines
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="/magazines/wildlife-forever"
          className="text-700"
        >
          Wildlife Forever
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-700">
          Add Post
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form
        onSubmit={e => {
          savePost(e);
        }}
      >
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Post Type</Form.Label>
          {/* <Form.Control
            type="text"
            value={formData?.type}
            placeholder="Post Type"
            onChange={e => {
              setFormData({ ...formData, type: e.target.value });
            }}
          /> */}
          <Select
            closeMenuOnSelect={false}
            options={postType}
            classNamePrefix="react-select"
            value={formData?.type}
            placeholder="Post Type"
            onChange={e => {
              console.log(e);
              setPostLinkInput(e.value);
              setFormData({ ...formData, type: e });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData?.title}
            placeholder="Post Title"
            onChange={e => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={formData?.bodyText}
            onChange={e =>
              setFormData({
                ...formData,
                bodyText: e.target.value
              })
            }
          />
        </Form.Group>

        {postLinkInput === 'External Link' && (
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Post Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Post Link"
              // value={formData?.title}
              // onChange={e => {
              //   setFormData({ ...formData, title: e.target.value });
              // }}
            />
          </Form.Group>
        )}

        {postLinkInput === 'Content' && (
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              value={formBody?.imgUrl}
              onChange={e =>
                setFormBody({ ...formBody, imgUrl: [e?.target?.value] })
              }
            />
          </Form.Group>
        )}

        {postLinkInput === 'Content' && (
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Background Image</Form.Label>
            <Form.Control
              type="file"
              value={formBody?.bgUrl[0]}
              onChange={e =>
                setFormBody({ ...formBody, bgUrl: [e?.target?.value] })
              }
            />
          </Form.Group>
        )}

        {postLinkInput === 'Content' && (
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Video</Form.Label>
            <Form.Control
              type="file"
              value={formBody?.videoUrl[0]}
              onChange={e =>
                setFormBody({ ...formBody, videoUrl: [e?.target?.value] })
              }
            />
          </Form.Group>
        )}

        {postLinkInput === 'Content' && (
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control
              type="file"
              value={formBody?.associatedProjects[0]}
              onChange={e =>
                setFormBody({
                  ...formBody,
                  associatedProjects: [e?.target?.value]
                })
              }
            />
          </Form.Group>
        )}

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
            This is a Project Update
          </div>
        </div>
        {checked ? (
          <>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select Project</Form.Label>
              <Select
                closeMenuOnSelect={false}
                options={organizerOptionsMulti}
                placeholder="Select Project"
                isMulti
                classNamePrefix="react-select"
                // value={category}
                // onChange={value => {
                //   setCategory(value);
                // }}
              />
            </Form.Group>
          </>
        ) : null}

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Select
            closeMenuOnSelect={false}
            options={organizerOptions}
            placeholder="Select Status"
            classNamePrefix="react-select"
            value={formData?.status}
            onChange={e => {
              console.log(e.value);
              setFormData({
                ...formData,
                status: e
              });
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </>
  );
};

export default wildlifeAddPost;
