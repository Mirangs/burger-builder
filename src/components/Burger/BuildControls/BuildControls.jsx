import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../../store/actions';
import BuildControl from './BuildControl/BuildControl';

import './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = ({ purchasable, onPurchasing }) => {
  const dispatch = useDispatch();
  const { ings, totalPrice } = useSelector((state) => ({
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
  }));

  const disabled = ings.reduce(
    (acc, ing) => ({ ...acc, [ing.name]: ing.amount <= 0 }),
    {}
  );

  return (
    <section className="BuildControls">
      <p>
        Current Price: <strong>{totalPrice}$</strong>
      </p>

      <ul>
        {controls.map((control) => (
          <li key={control.label}>
            <BuildControl
              label={control.label}
              ingredientAdded={() =>
                dispatch(actions.addIngredient(control.type))
              }
              ingredientRemoved={() =>
                dispatch(actions.removeIngredient(control.type))
              }
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
