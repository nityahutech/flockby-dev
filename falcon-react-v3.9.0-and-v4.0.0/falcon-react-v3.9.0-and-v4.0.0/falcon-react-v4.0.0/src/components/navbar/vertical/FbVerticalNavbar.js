import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import AppContext from 'context/Context';
import classNames from 'classnames';
import bgNavbar from 'assets/img/generic/bg-navbar.png';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import Flex from 'components/common/Flex';
import Logo from 'components/common/Logo';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import ToggleButton from './ToggleButton';
import routes from 'routes/routes';
import { capitalize } from 'helpers/utils';
import NavbarTopDropDownMenus from 'components/navbar/top/NavbarTopDropDownMenus';
import PurchaseCard from './PurchaseCard';
import { useLocation } from 'react-router-dom';

const FbVerticalNavbar = () => {
  const location = useLocation();
  console.log('location.pathname', location.pathname);

  const {
    config: {
      navbarPosition,
      navbarStyle,
      isNavbarVerticalCollapsed,
      showBurgerMenu
    }
  } = useContext(AppContext);
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add('navbar-vertical-collapsed-hover');
      }, 100);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(time);
    HTMLClassList.remove('navbar-vertical-collapsed-hover');
  };
  return (
    <Navbar
      expand={navbarBreakPoint}
      className={classNames('navbar-vertical', {
        [`navbar-${navbarStyle}`]: navbarStyle !== 'transparent'
      })}
      variant="light"
      style={{ marginTop: '75px' }}
    >
      <Navbar.Collapse
        in={showBurgerMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage:
            navbarStyle === 'vibrant'
              ? `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2),url(${bgNavbar})`
              : 'none'
        }}
      >
        <div className="navbar-vertical-content scrollbar">
          <Nav className="flex-column" as="ul">
            <Nav.Link
              href="/"
              style={
                location.pathname == '/'
                  ? { color: '#4695FF', fontWeight: 700 }
                  : {}
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/dashboard/manage-admin"
              style={
                location.pathname == '/dashboard/manage-admin'
                  ? { color: '#4695FF', fontWeight: 700 }
                  : {}
              }
            >
              Manage Admins
            </Nav.Link>
            <Nav.Link
              href="/dashboard/manage-magazines"
              style={
                location.pathname == '/dashboard/manage-magazines'
                  ? { color: '#4695FF', fontWeight: 700 }
                  : {}
              }
            >
              Manage Magazines
            </Nav.Link>
            <Nav.Link
              href="/dashboard/manage-ngos"
              style={
                location.pathname == '/dashboard/manage-ngos'
                  ? { color: '#4695FF', fontWeight: 700 }
                  : {}
              }
            >
              Manage NGOs
            </Nav.Link>
            <Nav.Link
              href="/dashboard/manage-categories"
              style={
                location.pathname == '/dashboard/manage-categories'
                  ? { color: '#4695FF', fontWeight: 700 }
                  : {}
              }
            >
              Manage Categories
            </Nav.Link>
            <hr />
            {/* <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>{' '} */}
            <div style={{ fontSize: '10px', fontWeight: '700' }}>Magazines</div>
            <Nav.Link
              href="/magazines/wildlife-forever"
              style={
                location.pathname == '/magazines/wildlife-forever'
                  ? { color: '#4695FF', fontWeight: 700 }
                  : {}
              }
            >
              Wildlife Forever
            </Nav.Link>
            <Nav.Link eventKey="link-4">Restoration Central</Nav.Link>
            <Nav.Link eventKey="link-5">Organic Matters</Nav.Link>
            <hr />
            <div style={{ fontSize: '10px', fontWeight: '700' }}>NGOs</div>
            <Nav.Link
              href="/ngos/ngo-wildlife-forever"
              style={
                location.pathname == '/ngos/ngo-wildlife-forever'
                  ? { color: '#4695FF', fontWeight: 700 }
                  : {}
              }
            >
              Wildlife Forever
            </Nav.Link>
            <Nav.Link eventKey="link-6">Restoration Central</Nav.Link>
            <hr />
            <div style={{ fontSize: '10px', fontWeight: '700' }}>
              Categories
            </div>
            <Nav.Link href="">Food and Beverages</Nav.Link>
            <Nav.Link eventKey="link-6">Outdoors</Nav.Link>
          </Nav>
        </div>
      </Navbar.Collapse>
      {/* <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Active</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav> */}
    </Navbar>
  );
};

export default FbVerticalNavbar;
