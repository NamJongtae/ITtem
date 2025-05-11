import { create, ImmerDevtoolsStateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface LoadingState {
  isLoading: boolean;
  loadingCount: number;
  actions: {
    startLoading: () => void;
    stopLoading: () => void;
  };
}

export const store: ImmerDevtoolsStateCreator<LoadingState> = (set) => ({
  isLoading: false,
  loadingCount: 0,
  actions: {
    startLoading: () => {
      set(
        (state: LoadingState) => {
          state.loadingCount++;
          state.isLoading = true;
        },
        false,
        "loading/startLoading"
      );
    },
    stopLoading: () => {
      set(
        (state: LoadingState) => {
          state.loadingCount = Math.max(0, state.loadingCount - 1);
          state.isLoading = state.loadingCount > 0;
        },
        false,
        "loading/stopLoading"
      );
    }
  }
});

const useGlobalLoadingStore =
  process.env.NODE_ENV !== "production"
    ? create<LoadingState>()(immer(devtools(store)))
    : create<LoadingState>()(immer(store));

export default useGlobalLoadingStore;
