import React from 'react';

import './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

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
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
