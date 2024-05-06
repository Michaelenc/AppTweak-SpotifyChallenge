import { combineReducers } from "redux";

import authentication from "../containers/auth/slice";
import api from "../api/apiSlice";
import accountState from "../song/songSlice";

const rootReducer = combineReducers({
  authentication,
  api,
  accountState
});

export default rootReducer;
