import auth from "./auth";
import band from "./band";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import messages from "./messages";
import modal from "./modal";
import notifications from "./notifications";
import profile from "./profile";
import register from "./register";
import user from "./user";
import verify from "./verify";

export default combineReducers({
  auth,
  notifications,
  register,
  messages,
  user,
  modal,
  profile,
  band,
  verify,
  form: formReducer
});
