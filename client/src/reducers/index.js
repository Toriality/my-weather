import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  weather: weatherReducer,
  error: errorReducer,
  auth: authReducer,
});
