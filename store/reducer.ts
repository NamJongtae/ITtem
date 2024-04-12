import { combineReducers } from "redux";
import { modalSlice } from "./modalSlice";
import { signupSlice } from "./signupSlice";

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
  signup: signupSlice.reducer,
});

export default rootReducer;
