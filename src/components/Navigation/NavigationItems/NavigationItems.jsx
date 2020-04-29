import React from 'react';
import { useSelector } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import UserDropDown from '../UserDropdown/UserDropDown';

import './NavigationItems.css';

const NavigationItems = () => {
  const { authenticated } = useSelector((state) => ({
    authenticated: state.auth.authenticated,
  }));

  return (
    authenticated && (
      <>
        <ul className="NavigationItems">
          <NavigationItem link="/" exact>
            BurgerBuilder
          </NavigationItem>
          <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
        <UserDropDown />
      </>
    )
  );
};

export default NavigationItems;
