import {
  GET_CURRENT_USER,
  REGISTER_USER,
  SET_CURRENT_USER,
  VERIFY_USER_EMAIL
} from "../constants";

export default function user(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return state;
    case SET_CURRENT_USER:
      return action.currentUser;
    case REGISTER_USER:
      return state;
    case VERIFY_USER_EMAIL:
      return state;
    default:
      return state;
  }
}
