import React, { useEffect } from 'react';
import axios from '../../axios-order';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, id } = useSelector((state) => ({
    orders: state.order.orders,
    loading: state.order.loading,
    id: state.auth.userId,
  }));

  useEffect(() => {
    dispatch(actions.fetchOrders(id));
  }, [dispatch, id]);

  let output = <Spinner />;
  if (!loading) {
    output = orders.map(({ id, ingredients, total_price }) => (
      <Col span={8}>
        <Order key={id} ingredients={ingredients} totalPrice={total_price} />
      </Col>
    ));
  }

  return (
    <Row justify="center" align="middle" gutter={[16, 16]}>
      {output}
    </Row>
  );
};

export default withErrorHandler(Orders, axios);
