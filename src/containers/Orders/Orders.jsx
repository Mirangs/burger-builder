import React, { useEffect, useState } from 'react';
import axios from '../../axios-order';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Pagination } from 'antd';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
import OrdersControls from '../../components/OrdersControls/OrdersControls';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, id, ingredients, total } = useSelector((state) => ({
    orders: state.order.orders,
    loading: state.order.loading,
    id: state.auth.userId,
    ingredients: state.burgerBuilder.ingredients.map((ing) => ing.name),
    total: state.order.total,
  }));
  const [filter, setFilter] = useState({
    order: 'asc',
    ingredients,
    limit: 9,
    offset: 0,
  });

  const filterOrders = (orders) =>
    orders
      .filter((order) =>
        order.ingredients.every((ing) => filter.ingredients.includes(ing.name))
      )
      .sort((a, b) =>
        filter.order === 'asc'
          ? a.total_price - b.total_price
          : b.total_price - a.total_price
      );

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const onPageChange = (page, pageSize) => {
    setFilter({ ...filter, offset: (page - 1) * pageSize });
  };

  useEffect(() => {
    const { limit, offset, order: orderBy } = filter;
    dispatch(actions.fetchOrders({ id, limit, offset, orderBy }));
  }, [dispatch, filter, id]);

  let output = <Spinner />;
  if (!loading) {
    output = filterOrders(orders).map(
      ({ id, ingredients, total_price, order_date, order_status }) => (
        <Col lg={8} xs={20} key={id}>
          <Order
            ingredients={ingredients}
            totalPrice={total_price}
            date={new Date(order_date).toLocaleString()}
            status={order_status}
          />
        </Col>
      )
    );
  }

  return (
    <>
      <OrdersControls filter={filter} onFilterChange={onFilterChange} />
      <OrdersList justify="center" align="start" gutter={[10, 10]}>
        {output}
      </OrdersList>
      <Pagination
        defaultPageSize={9}
        defaultCurrent={1}
        total={total}
        onChange={onPageChange}
        hideOnSinglePage
      />
    </>
  );
};

const OrdersList = styled(Row)`
  padding: 20px;
`;

export default withErrorHandler(Orders, axios);
