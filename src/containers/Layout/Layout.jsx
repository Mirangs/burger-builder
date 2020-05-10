import React, { useState } from 'react';
import styled from 'styled-components';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = ({ children }) => {
  const [isSideDrawerOpened, setIsSideDrawerOpened] = useState(false);

  const onSideDrawerClosed = () => {
    setIsSideDrawerOpened(false);
  };

  const onSideDrawerOpened = () => {
    setIsSideDrawerOpened(true);
  };

  return (
    <>
      <Toolbar onOpened={onSideDrawerOpened} />
      <SideDrawer isOpened={isSideDrawerOpened} onClosed={onSideDrawerClosed} />
      <Content>{children}</Content>
    </>
  );
};

const Content = styled.div`
  margin-top: 56px;
`;

export default Layout;
