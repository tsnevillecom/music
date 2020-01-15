import { SET_VERIFY_PENDING, SET_VERIFY_STATUS } from "../constants";

export default function verify(
  state = {
    verifyPending: false,
    isVerified: false
  },
  action
) {
  switch (action.type) {
    case SET_VERIFY_PENDING:
      return Object.assign({}, state, {
        verifyPending: action.verifyPending
      });

    case SET_VERIFY_STATUS:
      return Object.assign({}, state, {
        isVerified: action.isVerified
      });

    default:
      return state;
  }
}
