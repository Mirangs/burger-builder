import React from 'react';
import { Tag } from 'antd';

import Burger from '../Burger/Burger';

import './Order.css';
import styled from 'styled-components';

const Order = ({ ingredients, totalPrice }) => {
  const ingredientOutput = ingredients.map((ig) => {
    return (
      <Tag key={ig.name} color="blue">
        {ig.name} ({ig.amount})
      </Tag>
    );
  });

  return (
    <section className="Order">
      <p>Ingredients: </p>
      <p>{ingredientOutput}</p>
      <p>
        Price: <strong>${totalPrice}</strong>
      </p>
      <BurgerWrapper>
        <Burger ingredients={ingredients} />
      </BurgerWrapper>
    </section>
  );
};

const BurgerWrapper = styled.div`
  width: 100px;
`;

export default Order;
