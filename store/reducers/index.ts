import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { modalSlice } from "../modalSlice";
import { signupSlice } from "../signupSlice";
import { authSlice } from "../authSlice";
import { locationSlice } from "../locationSlice";

const combinedReducer = combineReducers({
  modal: modalSlice.reducer,
  signup: signupSlice.reducer,
  auth: authSlice.reducer,
  location: locationSlice.reducer,
});

const rootReducer: typeof combinedReducer = (state, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
export default rootReducer;
