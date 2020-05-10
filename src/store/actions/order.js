import * as actionTypes from './actionTypes';
import axios from 'axios';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = (err) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  err,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post(`/api/order/${orderData.id}`, orderData)
      .then((res) => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = (err) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  err,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const setTotalOrders = (total) => ({
  type: actionTypes.SET_TOTAL_ORDERS,
  total,
});

export const fetchOrders = ({ id, limit, offset, orderBy }) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get(
        `/api/order/${id}?limit=${limit}&&offset=${offset}&&orderBy=${orderBy}`
      )
      .then((res) => {
        dispatch(setTotalOrders(parseInt(res.data.count)));
        dispatch(fetchOrdersSuccess(res.data.orders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
