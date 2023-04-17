import React from 'react';
import Select from 'react-select';
import { Breadcrumb, Form } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const addCategories = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [parentCategories, setParentCategories] = useState('');
  const [status, setStatus] = useState('');
  const [categoryIds, setCategoryIds] = useState(null);
  const [iseditlist, setIsedit] = useState(false);
  console.log(iseditlist, 12345);
  const { state, isedit } = useLocation();
  console.log(state, isedit, 'CCCCCCCCCCCCCCCCCCCCCC');

  useEffect(() => {
    setIsedit(state?.isedit ? state?.isedit : false);
    if (state) {
      console.log(12345678);
      const {
        displayName,
        status,
        categoryId,
        commerceCategoryId,
        description,
        tagline
      } = state.data;
      setDisplayName(displayName);
      setTagline(tagline);
      setDescription(description);
      setStatus(
        status === 'Active'
          ? { value: 1, label: 'Active' }
          : { value: 2, label: 'Inactive' }
      );
      setCategoryId(commerceCategoryId);
      setCategoryIds(categoryId);
      // setType(type);
      // if (website !== 'undefined') {
      //   setWebsite(website);
      // }
    }
  }, [state]);

  const parentCategory = [
    { value: '1', label: 'Category 1' },
    { value: '2', label: 'Category 2' }
  ];
  const categoryStatus = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'Inactive' }
  ];
  const onSubmit = async e => {
    e.preventDefault();
    const addCategory = {
      displayName: displayName,
      tagline: tagline,
      description: description,
      commerceCategoryId: categoryId,
      status: status.label,
      categoryId: categoryIds
    };
    console.log('categoriesss', addCategory);

    if (iseditlist) {
      await axios
        .put(
          `http://127.0.0.1:8000/categories/editCategory?categoryId=${
            addCategory.categoryId
          }&updatedBy=${null}&displayName=${
            addCategory.displayName
          }&description=${addCategory.description}&tagline=${
            addCategory.tagline
          }&commerceCategoryId=${
            addCategory.commerceCategoryId
          }&categoryThumbnailUrl=${
            addCategory.categoryThumbnailUrl
          }&categoryImageUrl=${addCategory.categoryImageUrl}&status=${
            addCategory.status
          }`
        )
        .then(res => {
          console.log(res);
          navigate('/dashboard/manage-categories');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await axios
        .post(
          `http://127.0.0.1:8000/categories/addCategory?displayName=${addCategory.displayName}&description=${addCategory.description}&tagline=${addCategory.tagline}&commerceCategoryId=${addCategory?.commerceCategoryId}&categoryThumbnailUrl="https://docs.google.com/"&categoryImageUrl="https://docs.google.com/"&status=${addCategory.status}&createdBy="14.02.2014"&updatedBy="14.02.2014"`
        )
        .then(res => {
          console.log(res);
          navigate('/dashboard/manage-categories');
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
          href="/dashboard/manage-categories"
          className="text-700"
        >
          Manage Categories
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-700">
          Add Categories
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            value={displayName}
            placeholder="Display Name"
            onChange={e => {
              setDisplayName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Tagline</Form.Label>
          <Form.Control
            type="text"
            value={tagline}
            placeholder="Category Tagline"
            onChange={e => {
              setTagline(e.target.value);
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
          <Form.Label>Upload Category Thumbnail</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Category Image</Form.Label>
          <Form.Control
            type="file"
            // value={logoUrl}
            // onChange={e => {
            //   setLogoUrl(e.target.value);
            // }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Commerce Category Id</Form.Label>
          <Form.Control
            type="number"
            value={categoryId}
            onChange={e => {
              setCategoryId(e.target.value);
            }}
            placeholder="Category ID"
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Parent Category</Form.Label>
          <Select
            closeMenuOnSelect={false}
            options={parentCategory}
            placeholder="Select Category"
            classNamePrefix="react-select"
            value={parentCategories}
            onChange={value => {
              setParentCategories(value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Select
            closeMenuOnSelect={false}
            options={categoryStatus}
            placeholder="Select Status"
            classNamePrefix="react-select"
            value={status}
            onChange={value => {
              setStatus(value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </>
  );
};

export default addCategories;
