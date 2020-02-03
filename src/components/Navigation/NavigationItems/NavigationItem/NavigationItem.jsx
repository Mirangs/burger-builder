import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = ({ children, link, exact }) => {
  return(
    <li className="NavigationItem">
      <NavLink 
        to={link}
        exact={exact}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;