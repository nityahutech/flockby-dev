import React from 'react';
import WeeklySales from './WeeklySales';
import { Row, Col, Card, Button, Nav } from 'react-bootstrap';
import {
  marketShare,
  totalOrder,
  totalSales,
  weeklySalesData,
  weather,
  products,
  storageStatus,
  files,
  users,
  topProducts,
  runningProjects
} from 'data/dashboard/default';

import TotalOrder from './TotalOrder';
import MarketShare from './MarketShare';
import TotalSales from './TotalSales';
import RunningProjects from './RunningProjects';
import StorageStatus from './StorageStatus';
import SpaceWarning from './SpaceWarning';
import BestSellingProducts from './BestSellingProducts';
import SharedFiles from './SharedFiles';
import ActiveUsers from './ActiveUsers';
import BandwidthSaved from './BandwidthSaved';
import TopProducts from './TopProducts';
import Weather from './Weather';
import PageHeader from 'components/common/PageHeader';
import { useNavigate } from 'react-router-dom';
import corner2 from '../../../assets/img/illustrations/corner-2.png';
import corner4 from '../../../assets/img/illustrations/corner-4.png';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <Card>Stuff</Card> */}
      {/* <Nav
        style="--falcon-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%23748194'/%3E%3C/svg%3E&#34;);"
        aria-label="breadcrumb"
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Library
          </li>
        </ol>
      </Nav> */}
      <div style={{ display: 'flex', columnGap: '10px' }}>
        {/* <Button href="/dashboard/manage-admin"> */}
        <PageHeader
          title="Manage Admins"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          style={{ cursor: 'pointer', height: '80px' }}
          onClick={() => navigate('/dashboard/manage-admin')}
        ></PageHeader>
        {/* </Button> */}
        <PageHeader
          title="Manage Magazines"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          image={corner2}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboard/manage-magazines')}
        >
          {/* <Button
          href={'cards'}
          target="_blank"
          variant="link"
          size="sm"
          className="ps-0"
        >
          Get Started
          <FontAwesomeIcon icon="chevron-right" className="ms-1 fs--2" />
        </Button> */}
        </PageHeader>
        <PageHeader
          title="Manage NGOs"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          image={corner4}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboard/manage-ngos')}
        >
          {/* <Button
          href={'cards'}
          target="_blank"
          variant="link"
          size="sm"
          className="ps-0"
        >
          Get Started
          <FontAwesomeIcon icon="chevron-right" className="ms-1 fs--2" />
        </Button> */}
        </PageHeader>
      </div>
      <hr />
      <div
        style={{ fontSize: '12px', fontWeight: '700', paddingBottom: '7px' }}
      >
        Magazines
      </div>
      <div style={{ display: 'flex', columnGap: '10px' }}>
        <PageHeader
          title="Wildlife Forever"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          style={{ cursor: 'pointer', height: '80px' }}
        ></PageHeader>
        <PageHeader
          title="Restoration Central"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          image={corner2}
        ></PageHeader>
        <PageHeader
          title="Organic Matters"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          image={corner4}
        ></PageHeader>
      </div>
      <hr />
      <div
        style={{ fontSize: '12px', fontWeight: '700', paddingBottom: '7px' }}
      >
        NGOs
      </div>
      <div style={{ display: 'flex', columnGap: '10px' }}>
        <PageHeader
          title="Wildlife Forever"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          style={{ cursor: 'pointer', height: '80px' }}
        ></PageHeader>
        <PageHeader
          title="Restoration Central"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          image={corner2}
        ></PageHeader>
      </div>
      <hr />
      <div
        style={{ fontSize: '12px', fontWeight: '700', paddingBottom: '7px' }}
      >
        Categories
      </div>
      <div style={{ display: 'flex', columnGap: '10px' }}>
        <PageHeader
          title="Food and Beverages"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          style={{ cursor: 'pointer', height: '80px' }}
        ></PageHeader>
        <PageHeader
          title="Outdoors"
          // description="The page header is a nice little feature to add appropriate spacing around the headings on a page. This is particularly helpful on a web page where you may have several post titles and need a way to add distinction to each of them."
          className="mb-3 w-25"
          image={corner2}
        ></PageHeader>
      </div>
    </>
    // <>
    //   <Row className="g-3 mb-3">
    //     <Col md={6} xxl={3}>
    //       <WeeklySales data={weeklySalesData} />
    //     </Col>
    //     <Col md={6} xxl={3}>
    //       <TotalOrder data={totalOrder} />
    //     </Col>
    //     <Col md={6} xxl={3}>
    //       <MarketShare data={marketShare} radius={['100%', '87%']} />
    //     </Col>
    //     <Col md={6} xxl={3}>
    //       <Weather data={weather} />
    //     </Col>
    //   </Row>

    //   <Row className="g-3 mb-3">
    //     <Col lg={6}>
    //       <RunningProjects data={runningProjects} />
    //     </Col>
    //     <Col lg={6}>
    //       <TotalSales data={totalSales} />
    //     </Col>
    //   </Row>

    //   <Row className="g-3 mb-3">
    //     <Col lg={6} xl={7} xxl={8}>
    //       <StorageStatus className="h-lg-100" data={storageStatus} />
    //     </Col>
    //     <Col lg={6} xl={5} xxl={4}>
    //       <SpaceWarning />
    //     </Col>
    //   </Row>

    //   <Row className="g-3 mb-3">
    //     <Col lg={7} xl={8}>
    //       <BestSellingProducts products={products} />
    //     </Col>
    //     <Col lg={5} xl={4}>
    //       <SharedFiles files={files} className="h-lg-100" />
    //     </Col>
    //   </Row>

    //   <Row className="g-3">
    //     <Col sm={6} xxl={3}>
    //       <ActiveUsers className="h-100" users={users} />
    //     </Col>
    //     <Col sm={6} xxl={3} className="order-xxl-1">
    //       <BandwidthSaved />
    //     </Col>
    //     <Col xxl={6}>
    //       <TopProducts data={topProducts} className="h-100" />
    //     </Col>
    //   </Row>
    // </>
  );
};

export default Dashboard;
