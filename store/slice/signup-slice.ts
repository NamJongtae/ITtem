import { VERIFY_EMAIL_EXP } from '@/constants/constant';
import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signupSlice",
  initialState: {
    isSendToVerifyEmail: false,
    isVerifedEmail: false,
    counter: VERIFY_EMAIL_EXP,
    sendToVerifyEmailLoading: false,
    sendToVerifyEmailError: false,
  },
  reducers: {
    decrementCounter: (state) => {
      if (state.counter > 0) {
        state.counter -= 1;
      }
    },
    resetCounter: (state) => {
      state.counter = VERIFY_EMAIL_EXP;
    },
    inactiveCounter: (state) => {
      state.counter = 0;
    },
    sendToVerifyEmail: (state) => {
      state.isSendToVerifyEmail = true;
    },
    resetSendToVerifyEmail: (state) => {
      state.isSendToVerifyEmail = false;
    },
    verifedEmail: (state) => {
      state.isVerifedEmail = true;
    },
    resetVerifedEmail: (state) => {
      state.isVerifedEmail = false;
    },
    setSendToVerifyEmailLoading: (
      state,
      action: { payload: boolean; type: string }
    ) => {
      state.sendToVerifyEmailLoading = action.payload;
    },
    setSendToVerifyEmailError: (
      state,
      action: { payload: boolean; type: string }
    ) => {
      state.sendToVerifyEmailError = action.payload;
    },
  },
});
