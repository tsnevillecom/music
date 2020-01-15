import { SET_REGISTER_PENDING, SET_REGISTER_STATUS } from "../constants";

export default function register(
  state = {
    registerPending: false,
    isRegistered: false
  },
  action
) {
  switch (action.type) {
    case SET_REGISTER_PENDING:
      return Object.assign({}, state, {
        registerPending: action.registerPending
      });

    case SET_REGISTER_STATUS:
      return Object.assign({}, state, {
        isRegistered: action.isRegistered
      });

    default:
      return state;
  }
}
