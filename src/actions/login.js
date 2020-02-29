import axios from "axios";
import jwt from "jsonwebtoken";
import { SET_CURRENT_USER } from "../constants/auth";
import { postLogin } from "./../components/Home/services";

export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function login(data) {
  return dispatch => {
    return postLogin(data).then(res => {
      const token = res.data.data.token;
      const userId = res.data.data.userId;
      localStorage.setItem("userId", userId);
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  };
}

export function logOut() {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("transaction");
    localStorage.removeItem("userId");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
