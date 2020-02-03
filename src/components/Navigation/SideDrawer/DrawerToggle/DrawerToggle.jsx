import React from 'react';

import './DrawerToggle.css';

const DrawerToggle = ({ clicked }) => {
  return(
    <button className="DrawerToggle" onClick={clicked}>
      <svg width="30px" viewBox="0 0 30 30" fill="#FFFFFF">
        <rect width="30px" height="5px" x="0" y="0"></rect>
        <rect width="30px" height="5px" x="0" y="10"></rect>
        <rect width="30px" height="5px" x="0" y="20"></rect>
      </svg>
      Open menu
    </button>
  );
};

export default DrawerToggle;