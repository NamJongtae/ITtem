import { AuthData } from "@/types/auth-types";
import { create } from "zustand";
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

const isClient = typeof window !== "undefined";

export const store = (set: any): AuthState => ({
  user: null,
  isLoading: true,
  actions: {
    setAuth: (user: AuthData) => {
      set((state: AuthState) => {
        state.user = user;
      });
      if (isClient) {
        localStorage.setItem("uid", JSON.stringify(user.uid));
      }
    },
    resetAuth: () => {
      set((state: AuthState) => {
        state.user = null;
      });
      if (isClient) {
        localStorage.removeItem("uid");
      }
    },
    setIsLoading: (isLoading: boolean) => {
      set((state: AuthState) => {
        state.isLoading = isLoading;
      });
    },
  },
});

const useAuthStore = create<AuthState>()(
  immer(process.env.NODE_ENV !== "production" ? devtools(store) : store)
);

export default useAuthStore;
