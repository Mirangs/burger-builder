import React, { useState } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import './Layout.css';

const Layout = ({ children }) => {
  const [isSideDrawerOpened, setIsSideDrawerOpened] = useState(false);

  const onSideDrawerClosed = () => {
    setIsSideDrawerOpened(false);
  }

  const onSideDrawerOpened = () => {
    setIsSideDrawerOpened(true);
  }

  return(
    <>
      <Toolbar 
        onOpened={onSideDrawerOpened}
      />
      <SideDrawer 
        isOpened={isSideDrawerOpened}
        onClosed={onSideDrawerClosed} 
      />
      <div>SideDrawer, Backdrop</div>
      <main className="content">
        {children}
      </main>
    </>
  );
};

export default Layout;