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

export const fetchOrders = (id) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get(`/api/order/${id}`)
      .then((res) => {
        const fetchedOrders = [];
        // eslint-disable-next-line
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
