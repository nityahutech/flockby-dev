import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableWrapper from 'components/common/advance-table/AdvanceTableWrapper';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import { Breadcrumb, Col, Dropdown, Row } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import { Link } from 'react-router-dom';
import { infinite } from 'is_js';
import CardDropdown from 'components/common/CardDropdown';
import { useNavigate } from 'react-router-dom';

const ManageNgos = () => {
  const [dataArr, setdataArr] = useState([]);
  const navigation = useNavigate();
  let fetchNgoDetails = async () => {
    try {
      let data = await axios.get(`http://127.0.0.1:8000/ngos/`);
      setdataArr(data?.data?.data);
      console.log('data', data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  let newArr = [];
  dataArr.map((item, index) => newArr.push(Object.values(item)));
  let result = newArr?.map(it => it?.at(0));

  useEffect(() => {
    fetchNgoDetails();
  }, []);

  const columns = [
    {
      accessor: 'displayName',
      Header: 'Ngo Name'
    },
    {
      accessor: 'website',
      Header: 'Website'
    },
    {
      accessor: 'status',
      Header: 'Status'
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
                  navigation('/dashboard/add-ngos', {
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

  return (
    <>
      <div>
        <Breadcrumb className="my-3">
          <Breadcrumb.Item href="/" className="text-700">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="text-700">
            Manage NGOs
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row className="flex-between-center mb-3">
        <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
          <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">NGOs</h5>
        </Col>
        <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
          <Link to="/dashboard/add-ngos">
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
        <div className="mt-3">
          <AdvanceTablePagination table />
        </div>
      </AdvanceTableWrapper>
    </>
  );
};

export default ManageNgos;
