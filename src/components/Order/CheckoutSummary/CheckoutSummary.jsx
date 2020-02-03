import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import './CheckoutSummary.css';

const CheckoutSummary = ({ ingredients, onCheckoutCancelled, onCheckoutContinued }) => {
  return(
    <div className="CheckoutSummary">
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={ingredients} />
      </div>
      <Button 
        btnType="Danger"
        clicked={onCheckoutCancelled}
      >
        CANCEL
      </Button>
      <Button 
        btnType="Success"
        clicked={onCheckoutContinued}
      >
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;