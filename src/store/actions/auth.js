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
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCK4DjjCMvX9iojDU7Ptnxqeki2yovdiXE';

    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCK4DjjCMvX9iojDU7Ptnxqeki2yovdiXE';
    }

    axios
      .post(url, authData)
      .then((res) => {
        sessionStorage.setItem('idToken', res.data.idToken);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
