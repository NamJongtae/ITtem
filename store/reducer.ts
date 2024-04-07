import { combineReducers } from "redux";
import { modalSlice } from "./modalSlice";

const rootReducer = combineReducers({
  modal: modalSlice.reducer,
});

export default rootReducer;
