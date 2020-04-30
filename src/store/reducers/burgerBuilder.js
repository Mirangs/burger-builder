import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: [],
  totalPrice: 4,
  err: false,
};

const addIngredient = (state, action) => {
  const ingredient = state.ingredients.find(
    (ing) => ing.name === action.ingredientName
  );

  const updatedIngredient = {
    ...ingredient,
    amount: ingredient.amount + 1,
  };
  const updatedState = {
    ingredients: state.ingredients.map((ing) => {
      if (ing.name === action.ingredientName) {
        return updatedIngredient;
      }

      return ing;
    }),
    totalPrice: +(state.totalPrice + +ingredient.price).toFixed(2),
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const ingredient = state.ingredients.find(
    (ing) => ing.name === action.ingredientName
  );

  const updatedIngredient = {
    ...ingredient,
    amount: ingredient.amount - 1,
  };
  const updatedState = {
    ingredients: state.ingredients.map((ing) => {
      if (ing.name === action.ingredientName) {
        return updatedIngredient;
      }

      return ing;
    }),
    totalPrice: +(state.totalPrice - parseFloat(ingredient.price)).toFixed(2),
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    err: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {
    err: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
