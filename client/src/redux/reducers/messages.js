import { REMOVE_MESSAGE, SEND_MESSAGE } from "../constants";

export default function messages(state = [], action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return [action.message, ...state];
    case REMOVE_MESSAGE:
      return state.filter(message => message.key !== action.key);
    default:
      return state;
  }
}
