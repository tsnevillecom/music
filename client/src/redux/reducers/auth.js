import {
  SET_LOGOUT_PENDING,
  SET_LOGIN_PENDING,
  SET_AUTH_STATUS,
  SET_AUTH_ERROR
} from '../actions/types';

import { checkAuth } from '../actions';

checkAuth();

export default function auth(
  state = {
    loginPending: false,
    isAuthenticated: false,
    authError: null
  },
  action
) {
  switch (action.type) {
    case SET_LOGOUT_PENDING:
      return Object.assign({}, state, {
        logoutPending: action.logoutPending
      });

    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        loginPending: action.loginPending
      });

    case SET_AUTH_STATUS:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated
      });

    case SET_AUTH_ERROR:
      return Object.assign({}, state, {
        authError: action.error
      });

    default:
      return state;
  }
}
