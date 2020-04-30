import React, { useEffect } from 'react';
import axios from '../../axios-order';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';

import './Orders.css';

const Orders = ({ orders, loading, onFetchOrders, id }) => {
  useEffect(() => {
    onFetchOrders(id);
  }, [id, onFetchOrders]);

  let output = <Spinner />;
  if (!loading) {
    output = orders.map(({ id, ingredients, total_price }) => (
      <li key={id}>
        <Order ingredients={ingredients} totalPrice={total_price} />
      </li>
    ));
  }

  return <ul className="Orders">{output}</ul>;
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  id: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (id) => dispatch(actions.fetchOrders(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
