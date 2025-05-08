import { VERIFY_EMAIL_EXP } from "@/constants/constant";
import { create, ImmerDevtoolsStateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface VerificationEmailState {
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
    verifyEmail: () => void;
    resetIsVerifedEmail: () => void;
    setSendToVerifyEmailLoading: (isLoading: boolean) => void;
    setSendToVerifyEmailError: (isError: boolean) => void;
  };
}

export const store: ImmerDevtoolsStateCreator<VerificationEmailState> = (set) => ({
  isSendToVerifyEmail: false,
  isVerifiedEmail: false,
  timer: VERIFY_EMAIL_EXP,
  sendToVerifyEmailLoading: false,
  sendToVerifyEmailError: false,
  actions: {
    decrementTimer: () => {
      set(
        (state: VerificationEmailState) => {
          if (state.timer > 0) {
            state.timer -= 1;
          }
        },
        false,
        "verificationEmail/decrementTimer"
      );
    },
    resetTimer: () => {
      set(
        (state: VerificationEmailState) => {
          state.timer = VERIFY_EMAIL_EXP;
        },
        false,
        "verificationEmail/resetTimer"
      );
    },
    inactiveTimer: () => {
      set(
        (state: VerificationEmailState) => {
          state.timer = 0;
        },
        false,
        "verificationEmail/inactiveTimer"
      );
    },
    sendToVerifyEmail: () => {
      set(
        (state: VerificationEmailState) => {
          state.isSendToVerifyEmail = true;
        },
        false,
        "verificationEmail/sendToVerifyEmail"
      );
    },
    resetIsSendToVerifyEmail: () => {
      set(
        (state: VerificationEmailState) => {
          state.isSendToVerifyEmail = false;
        },
        false,
        "verificationEmail/resetIsSendToVerifyEmail"
      );
    },
    verifyEmail: () => {
      set(
        (state: VerificationEmailState) => {
          state.isVerifiedEmail = true;
        },
        false,
        "verificationEmail/verifiedEmail"
      );
    },
    resetIsVerifedEmail: () => {
      set(
        (state: VerificationEmailState) => {
          state.isVerifiedEmail = false;
        },
        false,
        "verificationEmail/resetIsVerifedEmail"
      );
    },
    setSendToVerifyEmailLoading: (isLoading: boolean) => {
      set(
        (state: VerificationEmailState) => {
          state.sendToVerifyEmailLoading = isLoading;
        },
        false,
        "verificationEmail/setSendToVerifyEmailLoading"
      );
    },
    setSendToVerifyEmailError: (isError: boolean) => {
      set(
        (state: VerificationEmailState) => {
          state.sendToVerifyEmailError = isError;
        },
        false,
        "verificationEmail/setSendToVerifyEmailError"
      );
    }
  }
});

const useVerificationEmailStore =
  process.env.NODE_ENV !== "production"
    ? create<VerificationEmailState>()(immer(devtools(store)))
    : create<VerificationEmailState>()(immer(store));

export default useVerificationEmailStore;
