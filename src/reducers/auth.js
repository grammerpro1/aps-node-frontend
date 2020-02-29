import isEmpty from "lodash/isEmpty";
import { SET_CURRENT_USER } from "../constants/auth";

const initialState = {
  isAuth: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuth: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};
