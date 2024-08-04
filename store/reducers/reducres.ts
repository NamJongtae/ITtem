import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { signupSlice } from "../slice/signup-slice";
import { authSlice } from "../slice/auth-slice";
import { locationSlice } from "../slice/location-slice";
import { chatSlice } from "../slice/chat-slice";
import { notificationSlice } from "../slice/notification-slice";

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
