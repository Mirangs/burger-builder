import React, { useEffect } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = ({ 
  ingredients, 
  purchaseCancelled, 
  purchaseContinued, 
  totalPrice 
}) => {
  const ingredientSummary = Object.keys(ingredients)
    .map(igKey => (
      <li key={igKey}>{igKey.charAt(0).toUpperCase() + igKey.slice(1)}: {ingredients[igKey]}</li>
    ));

  useEffect(() => console.log('[Order Summary]: re-rendered'));

  return(
    <>
      <h3>Your order:</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <strong>Total Price: {totalPrice}$</strong>
      <p>Continue to Checkout?</p>
      <Button
        btnType="Success"
        clicked={purchaseContinued}
      >
        CONTINUE
      </Button>
      <Button
        btnType="Danger"
        clicked={purchaseCancelled}
      >
        CANCEL
      </Button>
    </>
  );
};

export default OrderSummary;