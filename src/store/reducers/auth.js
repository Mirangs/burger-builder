import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  err: null,
  loading: false,
  authenticated: false,
};

const authStart = (state, action) => {
  return updateObject(state, { err: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
    authenticated: true,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    err: action.err,
    loading: false,
  });
};

const authLogout = (state, action) => {
  sessionStorage.removeItem('idToken');
  return updateObject(state, {
    token: null,
    userId: null,
    authenticated: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
