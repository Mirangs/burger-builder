import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import { Redirect } from 'react-router-dom';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';

const BurgerBuilder = ({
  err,
  ings,
  totalPrice,
  onIngredientAdded,
  onIngredientRemoved,
  onInitIngredients,
  history,
  authenticated,
}) => {
  const [purchasing, setPurchasing] = useState(false);

  const updatePurchaseState = (ingredients) => {
    const sum = ingredients.reduce((acc, ing) => acc + ing.amount, 0);
    return sum > 0;
  };

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    history.push('/checkout');
  };

  const purchasingHandler = () => {
    setPurchasing(true);
  };

  const disabledInfo = ings.reduce(
    (acc, ing) => ({ ...acc, [ing.name]: ing.amount <= 0 }),
    {}
  );

  return (
    <>
      <OrderSummary
        visible={purchasing}
        ingredients={ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        totalPrice={totalPrice}
      />
      {Object.keys(ings).length !== 0 ? (
        <>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState(ings)}
            totalPrice={totalPrice}
            onPurchasing={purchasingHandler}
          />
        </>
      ) : err ? (
        <p>Ingredients can't be loaded...</p>
      ) : (
        <Spinner />
      )}

      {!authenticated && <Redirect to="/login" />}
    </>
  );
};

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  err: state.burgerBuilder.err,
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
