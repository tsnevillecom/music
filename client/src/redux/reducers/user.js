import { SET_CURRENT_USER, GET_CURRENT_USER } from '../actions/types';

export default function user(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return state;
    case SET_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
}
