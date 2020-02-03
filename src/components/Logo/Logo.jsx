import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

const Logo = ({ height }) => {
  return(
    <div className="Logo" style={{height}}>
      <img src={burgerLogo} alt="Burger Builder Logo"/>
    </div>
  );
};

export default Logo;