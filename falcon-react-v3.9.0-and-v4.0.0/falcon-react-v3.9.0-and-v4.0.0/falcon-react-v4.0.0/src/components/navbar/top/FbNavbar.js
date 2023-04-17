import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import classNames from 'classnames';
import AppContext from 'context/Context';
import Logo from 'components/common/Logo';
import SearchBox from './SearchBox';
import NavbarTopDropDownMenus from './NavbarTopDropDownMenus';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import autoCompleteInitialItem from 'data/autocomplete/autocomplete';
import TopNavRightSideNavItem from './TopNavRightSideNavItem';
import { useLocation } from 'react-router-dom';

const FbNavbar = () => {
  const {
    config: { showBurgerMenu, navbarPosition, navbarCollapsed },
    setConfig
  } = useContext(AppContext);

  const { pathname } = useLocation();
  const isChat = pathname.includes('chat');

  const [showDropShadow, setShowDropShadow] = useState(false);

  const handleBurgerMenu = () => {
    (navbarPosition === 'top' || navbarPosition === 'double-top') &&
      setConfig('navbarCollapsed', !navbarCollapsed);
    (navbarPosition === 'vertical' || navbarPosition === 'combo') &&
      setConfig('showBurgerMenu', !showBurgerMenu);
  };

  const setDropShadow = () => {
    const el = document.documentElement;
    if (el.scrollTop > 0) {
      setShowDropShadow(true);
    } else {
      setShowDropShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setDropShadow);
    return () => window.removeEventListener('scroll', setDropShadow);
  }, []);

  const burgerMenuRef = useRef();
  return (
    <Navbar
      className={classNames('navbar-glass fs--1 navbar-top sticky-kit', {
        // 'navbar-glass-shadow': showDropShadow
        'navbar-glass-shadow': showDropShadow && !isChat
      })}
      expand={
        navbarPosition === 'top' ||
        navbarPosition === 'combo' ||
        navbarPosition === 'double-top'
          ? topNavbarBreakpoint
          : true
      }
    >
      {/* <Container> */}
      <Nav>
        <div
          style={{
            color: '#4695FF',
            width: '266.15px',
            fontSize: '2.0736rem',
            fontWeight: '800'
          }}
        >
          flockby
        </div>{' '}
        {/* <Navbar.Brand href="#home">flockby</Navbar.Brand> */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse> */}
      </Nav>

      {/* </Container> */}
    </Navbar>
  );
};

export default FbNavbar;
