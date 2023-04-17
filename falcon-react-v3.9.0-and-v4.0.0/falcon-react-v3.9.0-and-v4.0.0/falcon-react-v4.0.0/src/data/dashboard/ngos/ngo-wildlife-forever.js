import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from 'components/common/IconButton';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import CardDropdown from 'components/common/CardDropdown';
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
const ngosWildlifeForever = () => {
  const [dataArr, setdataArr] = useState([]);
  const navigation = useNavigate();
  let fetchNgosWildlifeForeverDetails = async () => {
    try {
      let data = await axios.get(`http://127.0.0.1:8000/projects/`);
      // console.log(data);
      setdataArr(data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(dataArr);
  let newArr = [];
  dataArr?.data?.map((item, index) => newArr.push(Object.values(item)));
  let result = newArr?.map(it => it?.at(0));
  console.log(result);
  useEffect(() => {
    fetchNgosWildlifeForeverDetails();
  }, []);

  const columns = [
    {
      accessor: 'displayName',
      Header: 'Project Name',
      Cell: rowData => {
        const logo = rowData.row.original.logoUrl;
        const postTitle = rowData.row.original.displayName;
        console.log(logo, postTitle, rowData);
        return (
          <div className="ms-0 d-flex justify-content-start">
            <img
              src={logo}
              className="rounded-circle"
              style={{ width: '30px', height: '30px' }}
            />
            <p className="my-auto ps-2">{postTitle}</p>
          </div>
        );
      }
    },
    {
      accessor: 'status',
      Header: 'Status'
      // Cell: rowData => {
      //   const { status } = rowData.row.original;
      //   return <p className="my-auto">{status}</p>;
      // }
    },
    // {
    //   accessor: 'website',
    //   Header: 'Timestamp'
    //   // Cell: rowData => {
    //   //   const { timestamp } = rowData.row.original;
    //   //   return <p className="my-auto">{timestamp}</p>;
    //   // },
    //   // cellProps: {
    //   //   className: 'fw-medium'
    //   // }
    // }
    {
      Header: 'Action',
      Cell: ({ row }) => {
        console.log(row.original, 'ppppppppppppppppppppppppppppp');
        return (
          <CardDropdown>
            <div className="py-2">
              <Dropdown.Item
                onClick={() =>
                  navigation('/ngos/ngos-add-newproject', {
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
  const adminColumns = [
    // {
    //     accessor: 'avatar',
    //     Header: '',
    //     Cell: rowData => {
    //         const { avatar } = rowData.row.original;
    //         console.log(avatar);
    //         return(
    //           <img src={avatar} className="rounded-circle" style={{width:"30px" ,height:"30px"}}/>
    //         )
    //       }
    // },
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
      accessor: 'status',
      Header: 'Status',
      Cell: rowData => {
        const { status } = rowData.row.original;
        return <p className="my-auto">{status}</p>;
      },
      cellProps: {
        className: 'fw-medium'
      }
    }
  ];
  const adminData = [
    {
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80',
      name: 'Anna',
      email: 'anna@example.com',
      status: 'Active'
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80',
      name: 'Homer',
      email: 'homer@example.com',
      status: 'Inactive'
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80',
      name: 'Oscar',
      email: 'oscar@example.com',
      status: 'Active'
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80',
      name: 'Emily',
      email: 'emily@example.com',
      status: 'Inactive'
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=30&q=80',
      name: 'Jara',
      email: 'jara@example.com',
      status: 'Active'
    }
  ];
  return (
    <>
      <Breadcrumb className="my-3">
        <Breadcrumb.Item href="/" className="text-700">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/manage-magazines" className="text-700">
          Magazines
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="text-700">
          WildLife Forever
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white">
        <AdvanceTableWrapper
          columns={columns}
          data={result}
          sortable
          pagination
          perPage={5}
          className="ps-2"
        >
          <div className="p-3 d-flex justify-content-between align-items-center">
            <h1 className="fs--1 fs-sm-0 fs-md-1 fs-lg-2 m-0">Projects</h1>
            <Link to="/ngos/ngos-add-newproject">
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
          </div>
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              striped: true,
              className: 'fs--1 mb-0 overflow-hidden'
            }}
          />
          <div className="mt-3 pb-3 bg-white">
            <AdvanceTablePagination table />
          </div>
        </AdvanceTableWrapper>
      </div>
      {/* Admins */}
      <div className="mt-4 bg-white">
        <AdvanceTableWrapper
          columns={adminColumns}
          data={adminData}
          sortable
          className="ps-2"
        >
          <div className="p-3 d-flex justify-content-between align-items-center">
            <h1 className="fs--1 fs-sm-0 fs-md-1 fs-lg-2 m-0">
              List of Admins
            </h1>
            <IconButton
              variant="falcon-default"
              size="sm"
              icon="plus"
              transform="shrink-3"
              className="me-2"
            >
              <span className="d-none d-sm-inline-block ms-1">New</span>
            </IconButton>
          </div>
          <AdvanceTable
            table
            headerClassName="bg-200 text-900 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              striped: true,
              className: 'fs--1 mb-0 overflow-hidden'
            }}
          />
          <div className="mt-3 bg-white"></div>
        </AdvanceTableWrapper>
      </div>
    </>
  );
};

export default ngosWildlifeForever;
