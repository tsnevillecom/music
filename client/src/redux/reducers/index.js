import auth from "./auth";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import messages from "./messages";
import notifications from "./notifications";
import register from "./register";
import user from "./user";
import verify from "./verify";

export default combineReducers({
  auth,
  notifications,
  register,
  messages,
  user,
  verify,
  form: formReducer
});
