import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import NavigationItem from './NavigationItem/NavigationItem';
import UserDropDown from '../UserDropdown/UserDropDown';

import './NavigationItems.css';

const NavigationItems = () => {
  const { authenticated } = useSelector((state) => ({
    authenticated: state.auth.authenticated,
  }));

  return (
    authenticated && (
      <NavigationItemsWrapper>
        <ul className="NavigationItems">
          <NavigationItem link="/" exact>
            BurgerBuilder
          </NavigationItem>
          <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
        <UserDropDown />
      </NavigationItemsWrapper>
    )
  );
};

const NavigationItemsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column-reverse;

  @media (min-width: 720px) {
    flex-direction: column;
  }
`;

export default NavigationItems;
