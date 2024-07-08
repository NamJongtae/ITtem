import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { signupSlice } from "../signupSlice";
import { authSlice } from "../authSlice";
import { locationSlice } from "../locationSlice";
import { chatSlice } from "../chatSlice";
import { notificationSlice } from "../notification";

const combinedReducer = combineReducers({
  signup: signupSlice.reducer,
  auth: authSlice.reducer,
  location: locationSlice.reducer,
  chat: chatSlice.reducer,
  notification: notificationSlice.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

const rootReducer = (
  state: CombinedState | undefined,
  action: AnyAction
): CombinedState => {
  return combinedReducer(state, action);
};

export default rootReducer;
