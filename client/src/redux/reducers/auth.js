import {
  SET_AUTHENTICATED,
  SET_LOGIN_PENDING,
  SET_LOGOUT_PENDING
} from "../constants";

export default function auth(
  state = {
    loginPending: false,
    isAuthenticated: false
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

    case SET_AUTHENTICATED:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated
      });

    default:
      return state;
  }
}
