import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "reducers/user";
import api from "reducers/api";
import error from "reducers/error";
import menuDetails from "reducers/menuDetails";

const rootReducer = combineReducers({
  form: formReducer,
  user,
  api,
  error,
  menuDetails
});

export default rootReducer;
