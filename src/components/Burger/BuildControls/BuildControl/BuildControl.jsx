import React from 'react';

import './BuildControl.css';

const BuildControl = ({ label, ingredientAdded, ingredientRemoved, disabled }) => {
  return(
    <div className="BuildControl">
      <label className="Label">{label}</label>
      <button 
        className="Less"
        onClick={ingredientRemoved}
        disabled={disabled}
      >
        Less
      </button>
      <button 
        className="More"
        onClick={ingredientAdded}
      >
        More
      </button>
    </div>
  );
};

export default BuildControl;