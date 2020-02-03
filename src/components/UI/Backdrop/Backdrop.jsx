import React from 'react';

import './Backdrop.css';

const Backdrop = ({ isActive, clicked }) => {
  return(
    isActive &&
    <div className="Backdrop" onClick={clicked}></div>
  );
};

export default Backdrop;