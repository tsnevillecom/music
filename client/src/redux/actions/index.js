import {
  REMOVE_MESSAGE,
  SEND_MESSAGE,
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
  SET_LOGIN_PENDING,
  SET_LOGOUT_PENDING,
  SET_REGISTER_PENDING,
  SET_REGISTER_STATUS,
  SET_VERIFY_PENDING,
  SET_VERIFY_STATUS
} from "../constants";

import Cookies from "js-cookie";
import { UsersService } from "../../services/users.service";
import createMessage from "../factories/createMessage";
import { message } from "antd";

function clearToken() {
  Cookies.remove("token");
}

export function sendMessage(options) {
  return dispatch => {
    const messageConfig = createMessage(options);
    dispatch({
      type: SEND_MESSAGE,
      message: messageConfig
    });

    const { content, duration, key, onClose, type } = messageConfig;

    message[type](content, duration).then(() => {
      dispatch(removeMessage(key));
      if (onClose) {
        onClose();
      }
    });
  };
}

export function removeMessage(key) {
  return {
    type: REMOVE_MESSAGE,
    key
  };
}

export function initState() {
  return dispatch => {
    if (UsersService.currentUserToken()) {
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
    return UsersService.getCurrentUser()
      .then(res => {
        if (res.status === 200) {
          const currentUser = res.data;
          dispatch(setCurrentUser(currentUser));
          if (currentUser.isVerified) dispatch(setVerifyStatus(true));
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
    return UsersService.checkAuth()
      .then(res => {
        if (res.status === 200) {
          dispatch(setIsAuthenticated(true));
          return res;
        } else {
          clearToken();
          dispatch(setIsAuthenticated(false));
          return res;
        }
      })
      .catch(error => {
        clearToken();
        dispatch(handleError(error));
        dispatch(setIsAuthenticated(false));
      });
  };
}

export function logout(email, password) {
  return dispatch => {
    dispatch(setLogoutPending(true));

    return UsersService.logout()
      .then(res => {
        const { error } = res.data;
        if (res.status === 200) {
          dispatch(sendMessage({ content: "Logged out" }));
          dispatch(setCurrentUser({}));
          dispatch(setIsAuthenticated(false));
          clearToken();
        } else {
          dispatch(handleError(error));
        }
      })
      .catch(error => {
        dispatch(handleError(error));
      })
      .finally(function() {
        dispatch(setLogoutPending(false));
      });
  };
}

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setIsAuthenticated(false));

    return UsersService.login(email, password)
      .then(res => {
        const { user, token, error } = res.data;
        if (res.status === 200) {
          dispatch(sendMessage({ content: "Logged in", type: "success" }));
          dispatch(setIsAuthenticated(true));
          dispatch(setCurrentUser(user));
          Cookies.set("token", token);
        } else {
          dispatch(handleError(error));
        }
      })
      .catch(error => {
        dispatch(handleError(error));
      })
      .finally(function() {
        dispatch(setLoginPending(false));
      });
  };
}

export function register(user) {
  return dispatch => {
    dispatch(setRegisterPending(true));
    dispatch(setRegisterStatus(false));

    return UsersService.register(user)
      .then(res => {
        const { user, error } = res.data;
        if (res.status === 200) {
          dispatch(setRegisterStatus(true));
          dispatch(setCurrentUser(user));
        } else {
          dispatch(handleError(error));
        }
      })
      .catch(error => {
        dispatch(handleError(error));
      })
      .finally(function() {
        dispatch(setRegisterPending(false));
      });
  };
}

export function verify(url) {
  return dispatch => {
    dispatch(setVerifyPending(true));
    dispatch(setVerifyStatus(false));

    return UsersService.verify(url)
      .then(res => {
        const { user, error } = res.data;
        if (res.status === 200) {
          dispatch(setVerifyStatus(true));
          dispatch(setCurrentUser(user));
        } else {
          dispatch(handleError(error));
        }
      })
      .catch(error => {
        dispatch(handleError(error));
      })
      .finally(function() {
        dispatch(setVerifyPending(false));
      });
  };
}

function handleError(error) {
  return dispatch => {
    const message = error.response.data.error;
    const status = error.response.status;
    const content = status + ": " + message;
    dispatch(sendMessage({ content, type: "error" }));
  };
}

//USER
function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    currentUser
  };
}

//AUTH
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

function setIsAuthenticated(isAuthenticated) {
  return {
    type: SET_AUTHENTICATED,
    isAuthenticated
  };
}

//REGISTER
function setRegisterPending(registerPending) {
  return {
    type: SET_REGISTER_PENDING,
    registerPending
  };
}

function setRegisterStatus(isRegistered) {
  return {
    type: SET_REGISTER_STATUS,
    isRegistered
  };
}

//VERIFY
function setVerifyPending(verifyPending) {
  return {
    type: SET_VERIFY_PENDING,
    verifyPending
  };
}

function setVerifyStatus(isVerified) {
  return {
    type: SET_VERIFY_STATUS,
    isVerified
  };
}
