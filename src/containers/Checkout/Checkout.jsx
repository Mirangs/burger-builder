import React, { useEffect, useState } from 'react';
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
  purchased,
}) => {
  const [visible, setVisible] = useState(true);

  const onCheckoutCancelled = () => {
    history.goBack();
  };

  const onCheckoutContinued = () => {
    history.push('/checkout/contact-data');
    setVisible(false);
  };

  useEffect(() => {
    onPurchaseInit();
  }, [onPurchaseInit]);

  return (
    <div>
      {Object.keys(ingredients).length === 0 || purchased ? (
        <Redirect to="/" />
      ) : (
        <CheckoutSummary
          visible={visible}
          ingredients={ingredients}
          onCheckoutCancelled={onCheckoutCancelled}
          onCheckoutContinued={onCheckoutContinued}
        />
      )}
      <Route path={match.path + '/contact-data'} component={ContactData} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
});

const mapDispatchToProps = (dispatch) => ({
  onPurchaseInit: () => dispatch(actions.purchaseInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
