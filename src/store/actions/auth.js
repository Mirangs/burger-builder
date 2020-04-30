import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = (err) => ({
  type: actionTypes.AUTH_FAIL,
  err,
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
    };

    let url = '/api/auth/register';

    if (!isSignup) {
      url = '/api/auth/login';
    }

    axios
      .post(url, authData)
      .then((res) => {
        sessionStorage.setItem('token', res.data.token);
        dispatch(authSuccess(res.data.token, res.data.user.id));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.err));
      });
  };
};
