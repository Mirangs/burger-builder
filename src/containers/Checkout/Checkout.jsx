import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/';


const Checkout = ({
  ingredients,
  match,
  history,
  onPurchaseInit,
  purchased
}) => {
  const onCheckoutCancelled = () => {
    history.goBack();
  }

  const onCheckoutContinued = () => {
    history.replace('/checkout/contact-data');
  }

  useEffect(() => {
    onPurchaseInit()
  } ,[]);

  return(
    <div>
      {
        Object.keys(ingredients).length === 0 || purchased ?
        <Redirect to="/" /> :
        <CheckoutSummary 
          ingredients={ingredients}
          onCheckoutCancelled={onCheckoutCancelled}
          onCheckoutContinued={onCheckoutContinued} />
      }
      <Route 
        path={match.path + '/contact-data'} 
        component={ContactData} />
    </div>
  );
};

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients
});

const mapDispatchToProps = dispatch => ({
  onPurchaseInit: () => dispatch(actions.purchaseInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);