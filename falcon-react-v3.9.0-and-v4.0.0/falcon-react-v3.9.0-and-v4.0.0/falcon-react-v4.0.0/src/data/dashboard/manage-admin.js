import React, { useEffect, useState } from 'react';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import { Breadcrumb, Col, Row, Dropdown } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import CardDropdown from 'components/common/CardDropdown';
import axios from 'axios';
import { formatDate } from '@fullcalendar/react';

const columns = [
  {
    accessor: 'name',
    Header: 'Name',
    Cell: rowData => {
      const { avatar } = rowData.row.original;
      const { name } = rowData.row.original;
      console.log(avatar);
      return (
        <div className="ms-0 d-flex justify-content-start">
          <img
            src={avatar}
            className="rounded-circle"
            style={{ width: '30px', height: '30px' }}
          />
          <p className="my-auto ps-2">{name}</p>
        </div>
      );
    }
  },
  {
    accessor: 'email',
    Header: 'Email',
    Cell: rowData => {
      const { email } = rowData.row.original;
      return <a href={'mailto:' + email}>{email}</a>;
    }
  },
  {
    accessor: 'joined',
    Header: 'Joined',
    Cell: rowData => {
      const { joined } = rowData.row.original;
      return <time datetime={joined.replaceAll('/', '-')}>{joined}</time>;
    },
    cellProps: {
      className: 'fw-medium'
    }
  },
  {
    Header: 'Action',
    Cell: ({ row }) => {
      console.log(row.original, 'ppppppppppppppppppppppppppppp');
      return (
        <CardDropdown>
          <div className="py-2">
            <Dropdown.Item
              onClick={() =>
                navigation('/dashboard/add-admin', {
                  state: { data: row.original, isedit: true }
                })
              }
            >
              Edit
            </Dropdown.Item>
          </div>
        </CardDropdown>
      );
    }
  }
];

// const data = [
//   {
//     name: 'Anna',
//     email: 'anna@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Homer',
//     email: 'homer@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Oscar',
//     email: 'oscar@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Emily',
//     email: 'emily@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Jara',
//     email: 'jara@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Clark',
//     email: 'clark@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Jennifer',
//     email: 'jennifer@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Tony',
//     email: 'tony@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Tom',
//     email: 'tom@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Michael',
//     email: 'michael@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Antony',
//     email: 'antony@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Raymond',
//     email: 'raymond@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Marie',
//     email: 'marie@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Cohen',
//     email: 'cohen@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   },
//   {
//     name: 'Rowen',
//     email: 'rowen@example.com',
//     joined: '18/03/2018',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80'
//   }
// ];
const ManageAdmin = () => {
  const [dataArr, setdataArr] = useState([]);
  const [result, setResult] = useState([]);
  const navigation = useNavigate();
  let fetchAdminDetails = async () => {
    try {
      let { data } = await axios.get(`http://127.0.0.1:8000/users/listAdmins
      `);
      const formatedData = data?.admins?.map(a => ({
        email: a?.email,
        name: a?.displayName,
        avatar: '😎',
        joined: a?.updatedOn
          ? new Date(a?.updatedOn)?.toLocaleDateString()
          : '--'
      }));
      console.log({ formatedData });
      setResult(formatedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);
  return (
    <>
      <div>
        <Breadcrumb className="my-3">
          <Breadcrumb.Item href="/" className="text-700">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-700">
            Manage Admins
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white">
        <Row
          className="flex-between-center  p-2 d-flex justify-content-between align-items-center"
          // style={{ borderRadius: '6px' }}
        >
          <Col xs={4} sm="auto" className="d-flex align-items-center p-2">
            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Admins</h5>
          </Col>
          <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
            <Link to="/dashboard/add-admin">
              <IconButton
                variant="falcon-default"
                size="sm"
                icon="plus"
                transform="shrink-3"
                className="me-2"
              >
                <span className="d-none d-sm-inline-block ms-1">New</span>
              </IconButton>
            </Link>
          </Col>
        </Row>
        <AdvanceTableWrapper
          columns={columns}
          data={result}
          sortable
          pagination
          perPage={5}
        >
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              bordered: true,
              striped: true,
              className: 'fs--1 mb-0 overflow-hidden'
            }}
          />
          <div className="mt-3 pb-2">
            <AdvanceTablePagination table />
          </div>
        </AdvanceTableWrapper>
      </div>
    </>
  );
};

export default ManageAdmin;
