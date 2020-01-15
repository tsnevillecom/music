import { REMOVE_NOTIFICATION, SEND_NOTIFICATION } from "../constants";

export default function notifications(state = [], action) {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return [action.notification, ...state];

    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.key !== action.key);

    default:
      return state;
  }
}
