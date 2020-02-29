import axios from "axios";

export function userSignUpRequest(userData) {
  return dispatch => {
    return axios.post("http://localhost:4001/api/users", userData);
  };
}
