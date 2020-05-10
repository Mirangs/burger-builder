import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styled from 'styled-components';

const Burger = ({ ingredients }) => {
  let isEmpty = true;

  let transformedIngredients = ingredients.reduce((acc, ing, ind) => {
    const res = [];
    for (let i = 0; i < ing.amount; i++) {
      isEmpty = false;
      res.push(<BurgerIngredient key={i + ind} type={ing.name} />);
    }

    return [...acc, res];
  }, []);

  if (isEmpty) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <BurgerWrapper>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </BurgerWrapper>
  );
};

const BurgerWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  overflow: scroll;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

export default Burger;
