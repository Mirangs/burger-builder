import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios-order';
import { useHistory } from 'react-router-dom';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
import styled from 'styled-components';

const BurgerBuilder = () => {
  const [purchasing, setPurchasing] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { ings, totalPrice, err, authenticated } = useSelector((state) => ({
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.err,
    authenticated: state.auth.authenticated,
  }));

  const updatePurchaseState = (ingredients) => {
    const sum = ingredients.reduce((acc, ing) => acc + ing.amount, 0);
    return sum > 0;
  };

  useEffect(() => {
    dispatch(actions.initIngredients());
    dispatch(actions.setTotalPrice(4));
  }, [dispatch]);

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    history.push('/checkout');
  };

  const purchasingHandler = () => {
    setPurchasing(true);
  };

  return (
    <BurgerBuilderWrapper>
      <OrderSummary
        visible={purchasing}
        ingredients={ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        totalPrice={totalPrice}
      />
      {Object.keys(ings).length !== 0 ? (
        <>
          <BurgerWrapper>
            <Burger ingredients={ings} />
          </BurgerWrapper>
          <BuildControls
            purchasable={updatePurchaseState(ings)}
            onPurchasing={purchasingHandler}
          />
        </>
      ) : err ? (
        <p>Ingredients can't be loaded...</p>
      ) : (
        <Spinner />
      )}

      {!authenticated && history.push('/login')}
    </BurgerBuilderWrapper>
  );
};

export const BurgerWrapper = styled.div`
  width: 350px;
  height: 300px;
  margin: 0 auto;

  @media (min-width: 500px) {
    width: 450px;
    height: 400px;
  }

  @media (min-width: 1000px) {
    width: 700px;
    height: 600px;
  }
`;

const BurgerBuilderWrapper = styled.div`
  padding-top: 20px;
`;

export default withErrorHandler(BurgerBuilder, axios);
