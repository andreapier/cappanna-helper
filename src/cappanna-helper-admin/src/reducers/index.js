import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "./user";
import api from "./api";
import error from "./error";
import menuDetails from "./menuDetails";

const rootReducer = combineReducers({
  form: formReducer,
  user,
  api,
  error,
  menuDetails
});

export default rootReducer;
