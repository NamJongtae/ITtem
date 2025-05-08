import { VERIFICATION_EMAIL_EXP } from "@/constants/constant";
import { create, ImmerDevtoolsStateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface VerificationEmailState {
  isSendToVerificationEmail: boolean;
  isVerifiedEmail: boolean;
  timer: number;
  sendToVerificationEmailLoading: boolean;
  sendToVerificationEmailError: boolean;
  actions: {
    decrementTimer: () => void;
    resetTimer: () => void;
    inactiveTimer: () => void;
    sendToVerificationEmail: () => void;
    resetIsSendToVerificationEmail: () => void;
    verifyEmail: () => void;
    resetIsVerifedEmail: () => void;
    setSendToVerificationEmailLoading: (isLoading: boolean) => void;
    setSendToVerificationEmailError: (isError: boolean) => void;
  };
}

export const store: ImmerDevtoolsStateCreator<VerificationEmailState> = (set) => ({
  isSendToVerificationEmail: false,
  isVerifiedEmail: false,
  timer: VERIFICATION_EMAIL_EXP,
  sendToVerificationEmailLoading: false,
  sendToVerificationEmailError: false,
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
          state.timer = VERIFICATION_EMAIL_EXP;
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
    sendToVerificationEmail: () => {
      set(
        (state: VerificationEmailState) => {
          state.isSendToVerificationEmail = true;
        },
        false,
        "verificationEmail/sendToVerificationEmail"
      );
    },
    resetIsSendToVerificationEmail: () => {
      set(
        (state: VerificationEmailState) => {
          state.isSendToVerificationEmail = false;
        },
        false,
        "verificationEmail/resetIsSendToVerificationEmail"
      );
    },
    verifyEmail: () => {
      set(
        (state: VerificationEmailState) => {
          state.isVerifiedEmail = true;
        },
        false,
        "verificationEmail/verifiyEmail"
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
    setSendToVerificationEmailLoading: (isLoading: boolean) => {
      set(
        (state: VerificationEmailState) => {
          state.sendToVerificationEmailLoading = isLoading;
        },
        false,
        "verificationEmail/setSendToVerificationEmailLoading"
      );
    },
    setSendToVerificationEmailError: (isError: boolean) => {
      set(
        (state: VerificationEmailState) => {
          state.sendToVerificationEmailError = isError;
        },
        false,
        "verificationEmail/setSendToVerificationEmailError"
      );
    }
  }
});

const useVerificationEmailStore =
  process.env.NODE_ENV !== "production"
    ? create<VerificationEmailState>()(immer(devtools(store)))
    : create<VerificationEmailState>()(immer(store));

export default useVerificationEmailStore;
