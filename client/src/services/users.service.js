import Cookies from "js-cookie";
import axios from "axios";

export const UsersService = {
  currentUserToken,
  register,
  login,
  logout,
  checkAuth,
  getCurrentUser,
  getUsers,
  getUserByUserName,
  verify
};

function currentUserToken() {
  return Cookies.get("token");
}

function login(userName, password) {
  return axios({
    url: "/login",
    method: "post",
    data: { userName, password },
    responseType: "json"
  });
}

function verify(url) {
  return axios({
    url,
    method: "get",
    responseType: "json"
  });
}

function register(user) {
  return axios({
    url: "/register",
    method: "post",
    data: user,
    responseType: "json"
  });
}

function logout() {
  return axios({
    url: "/logout",
    method: "post",
    headers: { Authorization: `Bearer ${currentUserToken()}` }
  });
}

function checkAuth() {
  return axios({
    url: "/checkToken",
    method: "get",
    headers: { Authorization: `Bearer ${currentUserToken()}` }
  });
}

function getCurrentUser() {
  return axios({
    url: "/me",
    method: "get",
    headers: { Authorization: `Bearer ${currentUserToken()}` }
  });
}

function getUserByUserName(userName) {
  return axios({
    url: `/users/${userName}`,
    method: "get",
    headers: { Authorization: `Bearer ${currentUserToken()}` }
  });
}

function getUsers() {
  return axios({
    url: "/users",
    method: "get",
    headers: { Authorization: `Bearer ${currentUserToken()}` },
    responseType: "json"
  });
}
