import React from 'react';
import { Drawer } from 'antd';

import NavigationItems from '../NavigationItems/NavigationItems';

import './SideDrawer.css';

const SideDrawer = ({ onClosed, isOpened }) => {
  return (
    <Drawer title="Menu" placement="left" onClose={onClosed} visible={isOpened}>
      <NavigationItems />
    </Drawer>
  );
};

export default SideDrawer;
