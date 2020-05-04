import * as actionTypes from '../actions/actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const setTotalPrice = (price) => ({
  type: actionTypes.SET_TOTAL_PRICE,
  price,
});

export const initIngredients = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('/api/ingredient');
      const data = await res.json();
      dispatch(setIngredients(data));
    } catch (err) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
