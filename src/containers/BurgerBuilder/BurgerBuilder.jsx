import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-order';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
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
  history
}) => {
  const [purchasing, setPurchasing] = useState(false);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  useEffect(() => {
    onInitIngredients();
  }, []);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    history.push('/checkout');
  }

  const purchasingHandler = () => {
    setPurchasing(true);
  }

  const modalClosingHandler = () => {
    setPurchasing(false);
  }

  const disabledInfo = {
    ...ings
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return(
    <>
      <Modal isActive={purchasing} modalClosed={modalClosingHandler}>
        <OrderSummary 
          ingredients={ings} 
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          totalPrice={totalPrice}
        />
      </Modal>
      {
        Object.keys(ings).length !== 0 ? 
        (
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
        ) :
        err ? <p>Ingredients can't be loaded...</p> :
        <Spinner />
      }
    </>
  );
};

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  err: state.burgerBuilder.err
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));