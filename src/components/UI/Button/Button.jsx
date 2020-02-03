import React from 'react';

import './Button.css';

const Button = ({ children, clicked, btnType, disabled }) => {
  return(
    <button
      className={['Button', btnType].join(' ')}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;