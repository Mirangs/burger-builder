import React from 'react';
import { Tag } from 'antd';

import './Order.css';

const Order = ({ ingredients, totalPrice }) => {
  const ingredientOutput = ingredients.map((ig) => {
    return (
      <Tag key={ig.name} color="blue">
        {ig.name} ({ig.amount})
      </Tag>
    );
  });

  return (
    <div className="Order">
      <p>Ingredients: </p>
      <p>{ingredientOutput}</p>
      <p>
        Price: <strong>${totalPrice}</strong>
      </p>
    </div>
  );
};

export default Order;
