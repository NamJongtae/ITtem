import { AuthData } from "../types/authTypes";
import { create, ImmerDevtoolsStateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  user: AuthData | null;
  isLoading: boolean;
  actions: {
    setAuth: (user: AuthData) => void;
    resetAuth: () => void;
    setIsLoading: (isLoading: boolean) => void;
  };
}

export const store: ImmerDevtoolsStateCreator<AuthState> = (set) => ({
  user: null,
  isLoading: true,
  actions: {
    setAuth: (user: AuthData) => {
      set(
        (state) => {
          state.user = user;
        },
        false,
        "auth/setAuth"
      );
    },
    resetAuth: () => {
      set(
        (state: AuthState) => {
          state.user = null;
        },
        false,
        "auth/resetAuth"
      );
    },
    setIsLoading: (isLoading: boolean) => {
      set(
        (state: AuthState) => {
          state.isLoading = isLoading;
        },
        false,
        "auth/setIsLoading"
      );
    }
  }
});

const useAuthStore =
  process.env.NODE_ENV !== "production"
    ? create<AuthState>()(devtools(immer(store)))
    : create<AuthState>()(immer(store));

export default useAuthStore;
