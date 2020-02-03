import React, { useEffect } from 'react';
import axios from '../../axios-order';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';

import './Orders.css';

const Orders = ({ 
  orders, 
  loading, 
  onFetchOrders, 
  token
}) => {
  useEffect(() => {
    onFetchOrders(token);
  }, []);

  let output = <Spinner />;
  if (!loading) {
    output = orders.map(({id, ingredients, price}) => (
      <li key={id}>
        <Order
          ingredients={ingredients} 
          totalPrice={price}
        />
    </li>));
  }

  return(
      <ul className="Orders">
        {output}
      </ul>
  );
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: token => dispatch(actions.fetchOrders(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));