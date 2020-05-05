import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/';

const Checkout = () => {
  const [visible, setVisible] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const { ingredients, purchased } = useSelector((state) => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }));

  const onCheckoutCancelled = () => {
    history.push('/');
  };

  if (ingredients.length === 0 || purchased) {
    onCheckoutCancelled();
  }

  const onCheckoutContinued = () => {
    history.push('/checkout/contact-data');
    setVisible(false);
  };

  useEffect(() => {
    dispatch(actions.purchaseInit());
  }, [dispatch]);

  return (
    <div>
      <CheckoutSummary
        visible={visible}
        ingredients={ingredients}
        onCheckoutCancelled={onCheckoutCancelled}
        onCheckoutContinued={onCheckoutContinued}
      />
    </div>
  );
};

export default Checkout;
