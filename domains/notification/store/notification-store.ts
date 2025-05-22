import { create, ImmerDevtoolsStateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface NotificationState {
  unreadCount: number;
  actions: {
    setUnreadCount: (unreadCount: number) => void;
    resetUnreadCount: () => void;
  };
}

export const store: ImmerDevtoolsStateCreator<NotificationState> = (set) => ({
  unreadCount: 0,
  actions: {
    setUnreadCount: (unreadCount: number) => {
      set(
        (state: NotificationState) => {
          state.unreadCount = unreadCount;
        },
        false,
        "notification/setUnreadCount"
      );
    },
    resetUnreadCount: () => {
      set(
        (state: NotificationState) => {
          state.unreadCount = 0;
        },
        false,
        "notification/resetUnreadCount"
      );
    }
  }
});

const useNotificationStore =
  process.env.NODE_ENV !== "production"
    ? create<NotificationState>()(immer(devtools(store)))
    : create<NotificationState>()(immer(store))

export default useNotificationStore;
