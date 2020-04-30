import React from 'react';

import './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
  let transformedIngredients = ingredients.reduce((acc, ing, ind) => {
    const res = [];
    for (let i = 0; i < ing.amount; i++) {
      res.push(<BurgerIngredient key={i + ind} type={ing.name} />);
    }
    return acc.concat([...res]);
  }, []);

  if (transformedIngredients.length === 0) {
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
