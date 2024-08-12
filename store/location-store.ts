import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface LocationState {
  checkedLoacation: boolean;
  location: string;
  actions: {
    setLocation: (location: string) => void;
    resetLocation: () => void;
    setCheckLocation: (isCheck: boolean) => void;
  };
}

export const store = (set: any): LocationState => ({
  checkedLoacation: false,
  location: "",
  actions: {
    setLocation: (location: string) => {
      set((state: LocationState) => {
        state.location = location;
      }, false, "location/setLocation");
    },
    resetLocation: () => {
      set((state: LocationState) => {
        state.location = "";
      }, false, "location/resetLocation");
    },
    setCheckLocation: (isCheck: boolean) => {
      set((state: LocationState) => {
        state.checkedLoacation = isCheck;
      }, false, "location/setCheckLocation");
    },
  },
});

const useLocationStore = create<LocationState>()(
  immer(process.env.NODE_ENV !== "production" ? devtools(store) : store)
);

export default useLocationStore;
