import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = ({ 
  ingredientAdded, 
  ingredientRemoved, 
  disabled, 
  totalPrice, 
  purchasable, 
  onPurchasing 
}) => {
  return(
    <section className="BuildControls">

      <p>Current Price: <strong>{totalPrice}$</strong></p>

      <ul>
        {controls.map(control => (
          <li key={control.label}>
            <BuildControl
              label={control.label}
              ingredientAdded={() => ingredientAdded(control.type)}
              ingredientRemoved={() => ingredientRemoved(control.type)}
              disabled={disabled[control.type]}
            />
          </li>
        ))}
      </ul>

      <button 
        className="OrderButton"
        disabled={!purchasable}
        onClick={onPurchasing}
      >
        Order Now!
      </button>

    </section>
  );
};

export default BuildControls;