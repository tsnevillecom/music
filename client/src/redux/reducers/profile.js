import {
  GET_PROFILE_PENDING,
  SAVE_PROFILE_PENDING,
  SET_PROFILE
} from "../constants";

export default function profile(
  state = {
    profilePending: false,
    profile: undefined
  },
  action
) {
  switch (action.type) {
    case SET_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile
      });
    case GET_PROFILE_PENDING:
      return Object.assign({}, state, {
        profilePending: action.profilePending
      });
    case SAVE_PROFILE_PENDING:
      return Object.assign({}, state, {
        profilePending: action.profilePending
      });
    default:
      return state;
  }
}
