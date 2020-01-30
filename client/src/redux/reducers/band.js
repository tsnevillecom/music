import { GET_BAND_PENDING, SAVE_BAND_PENDING, SET_BAND } from "../constants";

export default function band(
  state = {
    saveBandPending: false,
    getBandPending: false,
    profile: undefined
  },
  action
) {
  switch (action.type) {
    case SET_BAND:
      return Object.assign({}, state, {
        profile: action.band
      });
    case GET_BAND_PENDING:
      return Object.assign({}, state, {
        getBandPending: action.getBandPending
      });
    case SAVE_BAND_PENDING:
      return Object.assign({}, state, {
        saveBandPending: action.saveBandPending
      });
    default:
      return state;
  }
}
