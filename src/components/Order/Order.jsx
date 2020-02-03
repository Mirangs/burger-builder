import React from 'react';

import './Order.css';

const Order = ({ ingredients, totalPrice }) => {
  const transformedIngredients = [];

  for (let ingredientName in ingredients) {
    transformedIngredients.push({
      name: ingredientName,
      amount: ingredients[ingredientName]
    });
  }

  const ingredientOutput = transformedIngredients.map(ig => {
    return (
      <span 
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return(
    <div className="Order">
      <p>Ingredients: </p>
      <p>{ingredientOutput}</p>
      <p>Price: <strong>USD {totalPrice}</strong></p>
    </div>
  );
};

export default Order;