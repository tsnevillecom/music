import {
  SET_CURRENT_USER,
  SET_LOGOUT_PENDING,
  SET_LOGIN_PENDING,
  SET_AUTH_STATUS,
  SET_AUTH_ERROR
} from './types';

import axios from 'axios';
import Cookies from 'js-cookie';

function callLoginApi(userName, password) {
  return axios({
    url: '/users/login',
    method: 'post',
    data: { userName, password },
    responseType: 'json'
  });
}

function callLogoutApi() {
  return axios({
    url: '/users/logout',
    method: 'post',
    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
  });
}

function callCheckAuthApi() {
  return axios({
    url: '/checkToken',
    method: 'get',
    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
  });
}

function callCurrentUserApi() {
  return axios({
    url: '/users/me',
    method: 'get',
    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
  });
}

function clearToken() {
  Cookies.remove('token');
}

export function initState() {
  return dispatch => {
    if (Cookies.get('token')) {
      return dispatch(checkAuth()).then(res => {
        if (res.status === 200) {
          dispatch(getCurrentUser());
        } else {
          clearToken();
        }
      });
    } else {
      return Promise.resolve();
    }
  };
}

export function getCurrentUser() {
  return dispatch => {
    return callCurrentUserApi()
      .then(res => {
        if (res.status === 200) {
          const currentUser = res.data;
          dispatch(setCurrentUser(currentUser));
          return currentUser;
        } else {
          clearToken();
          return res;
        }
      })
      .catch(error => {
        clearToken();
      });
  };
}

export function checkAuth() {
  return dispatch => {
    return callCheckAuthApi()
      .then(res => {
        if (res.status === 200) {
          dispatch(setAuthStatus(true));
          return res;
        } else {
          clearToken();
          dispatch(setAuthStatus(false));
          return res;
        }
      })
      .catch(error => {
        clearToken();
        dispatch(setAuthStatus(false));
      });
  };
}

export function logout(email, password) {
  return dispatch => {
    dispatch(setLogoutPending(true));
    dispatch(setAuthError(null));

    return callLogoutApi()
      .then(res => {
        if (res.status === 200) {
          dispatch(setCurrentUser({}));
          dispatch(setAuthStatus(false));
          clearToken();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(error => {
        dispatch(setAuthError(error));
        alert('Error logging out. Please try again');
      })
      .finally(function() {
        dispatch(setLogoutPending(false));
      });
  };
}

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setAuthStatus(false));
    dispatch(setAuthError(null));

    return callLoginApi(email, password)
      .then(res => {
        const { user, token, error } = res.data;
        if (res.status === 200) {
          dispatch(setAuthStatus(true));
          dispatch(setCurrentUser(user));
          Cookies.set('token', token);
        } else {
          const err = new Error(error);
          throw err;
        }
      })
      .catch(error => {
        dispatch(setAuthError(error));
        alert('Error logging in. Please try again');
      })
      .finally(function() {
        dispatch(setLoginPending(false));
      });
  };
}

function setLogoutPending(logoutPending) {
  return {
    type: SET_LOGOUT_PENDING,
    logoutPending
  };
}

function setLoginPending(logoutPending) {
  return {
    type: SET_LOGIN_PENDING,
    logoutPending
  };
}

function setAuthStatus(isAuthenticated) {
  return {
    type: SET_AUTH_STATUS,
    isAuthenticated
  };
}

function setAuthError(error) {
  return {
    type: SET_AUTH_ERROR,
    error
  };
}

function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    currentUser
  };
}
