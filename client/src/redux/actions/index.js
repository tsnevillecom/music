import {
  GET_BAND_PENDING,
  GET_PROFILE_PENDING,
  HIDE_MODAL,
  REMOVE_MESSAGE,
  SAVE_BAND_PENDING,
  SAVE_PROFILE_PENDING,
  SEND_MESSAGE,
  SET_AUTHENTICATED,
  SET_BAND,
  SET_CURRENT_USER,
  SET_LOGIN_PENDING,
  SET_LOGOUT_PENDING,
  SET_PROFILE,
  SET_REGISTER_PENDING,
  SET_REGISTER_STATUS,
  SET_VERIFY_PENDING,
  SET_VERIFY_STATUS,
  SHOW_MODAL
} from "../constants";

import { BandsService } from "../../services/bands.service";
import Cookies from "js-cookie";
import { UsersService } from "../../services/users.service";
import createMessage from "../factories/createMessage";

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

    // const { content, duration, key, onClose, type } = messageConfig;

    // message[type](content, duration).then(() => {
    //   dispatch(removeMessage(key));
    //   if (onClose) {
    //     onClose();
    //   }
    // });
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

export function logout() {
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

export function login({ userName, password }) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setIsAuthenticated(false));

    return UsersService.login(userName, password)
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

export function getProfile(userName) {
  return dispatch => {
    dispatch(getProfilePending(true));

    return UsersService.getUserByUserName(userName)
      .then(res => {
        const { user: profile, error } = res.data;
        if (res.status === 200) {
          dispatch(setProfile(profile));
        } else {
          dispatch(handleError(error));
        }
      })
      .catch(error => {
        dispatch(handleError(error));
      })
      .finally(function() {
        dispatch(getProfilePending(false));
      });
  };
}

export function getBand(slug) {
  return dispatch => {
    dispatch(getBandPending(true));

    return BandsService.getBandBySlug(slug)
      .then(res => {
        const { band, error } = res.data;
        if (res.status === 200) {
          dispatch(setBand(band));
        } else {
          dispatch(handleError(error));
        }
      })
      .catch(error => {
        dispatch(handleError(error));
      })
      .finally(function() {
        dispatch(getBandPending(false));
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

//PROFILE
function setProfilePending(profilePending) {
  return {
    type: SAVE_PROFILE_PENDING,
    profilePending
  };
}

function getProfilePending(profilePending) {
  return {
    type: GET_PROFILE_PENDING,
    profilePending
  };
}

function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile
  };
}

//BAND
function saveBandPending(saveBandPending) {
  return {
    type: SAVE_BAND_PENDING,
    saveBandPending
  };
}

function getBandPending(getBandPending) {
  return {
    type: GET_BAND_PENDING,
    getBandPending
  };
}

function setBand(band) {
  return {
    type: SET_BAND,
    band
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

//MODAL
export function showModal({ modalProps, modalData }) {
  return {
    type: SHOW_MODAL,
    modalProps,
    modalData
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  };
}
