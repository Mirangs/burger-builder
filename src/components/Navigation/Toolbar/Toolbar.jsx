import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = ({ onOpened }) => {
  const { authenticated } = useSelector((state) => ({
    authenticated: state.auth.authenticated,
  }));

  return (
    <Header>
      {authenticated && <DrawerToggle clicked={onOpened} />}
      <Logo height="80%" />
      <nav className="DesktopOnly">
        <NavigationItems />
      </nav>
    </Header>
  );
};

const Header = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #703b09;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-left: 20px;
  }

  .ant-dropdown-menu {
    background-color: #703b09;
  }

  @media (max-width: 499px) {
    .DesktopOnly {
      display: none;
    }
  }
`;

export default Toolbar;
