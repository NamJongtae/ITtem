import { VERIFY_EMAIL_EXP } from "@/constants/constant";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface SignupState {
  isSendToVerifyEmail: boolean;
  isVerifiedEmail: boolean;
  timer: number;
  sendToVerifyEmailLoading: boolean;
  sendToVerifyEmailError: boolean;
  actions: {
    decrementTimer: () => void;
    resetTimer: () => void;
    inactiveTimer: () => void;
    sendToVerifyEmail: () => void;
    resetIsSendToVerifyEmail: () => void;
    verifedEmail: () => void;
    resetIsVerifedEmail: () => void;
    setSendToVerifyEmailLoading: (isLoading: boolean) => void;
    setSendToVerifyEmailError: (isError: boolean) => void;
  };
}

export const store = (set: any): SignupState => ({
  isSendToVerifyEmail: false,
  isVerifiedEmail: false,
  timer: VERIFY_EMAIL_EXP,
  sendToVerifyEmailLoading: false,
  sendToVerifyEmailError: false,
  actions: {
    decrementTimer: () => {
      set((state: SignupState) => {
        if (state.timer > 0) {
          state.timer -= 1;
        }
      });
    },
    resetTimer: () => {
      set((state: SignupState) => {
        state.timer = VERIFY_EMAIL_EXP;
      });
    },
    inactiveTimer: () => {
      set((state: SignupState) => {
        state.timer = 0;
      });
    },
    sendToVerifyEmail: () => {
      set((state: SignupState) => {
        state.isSendToVerifyEmail = true;
      });
    },
    resetIsSendToVerifyEmail: () => {
      set((state: SignupState) => {
        state.isSendToVerifyEmail = false;
      });
    },
    verifedEmail: () => {
      set((state: SignupState) => {
        state.isVerifiedEmail = true;
      });
    },
    resetIsVerifedEmail: () => {
      set((state: SignupState) => {
        state.isVerifiedEmail = false;
      });
    },
    setSendToVerifyEmailLoading: (isLoading: boolean) => {
      set((state: SignupState) => {
        state.sendToVerifyEmailLoading = isLoading;
      });
    },
    setSendToVerifyEmailError: (isError: boolean) => {
      set((state: SignupState) => {
        state.sendToVerifyEmailError = isError;
      });
    },
  },
});

const useSignupStore = create<SignupState>()(
  immer(process.env.NODE_ENV !== "production" ? devtools(store) : store)
);

export default useSignupStore;
