import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import './SideDrawer.css';

const SideDrawer = ({ onClosed, isOpened }) => {
  let attachedClasses = ['SideDrawer', 'Close'];
  if (isOpened) {
    attachedClasses = ['SideDrawer', 'Open'];
  }

  return(
    <>
      <Backdrop isActive={isOpened} clicked={onClosed}/>
      <div className={attachedClasses.join(' ')}>
        <Logo height="11%"/>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;