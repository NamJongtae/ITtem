import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface NotificationState {
  unreadCount: number;
  actions: {
    setUnreadCount: (unreadCount: number) => void;
    resetUnreadCount: () => void;
  };
}

export const store = (set: any): NotificationState => ({
  unreadCount: 0,
  actions: {
    setUnreadCount: (unreadCount: number) => {
      set((state: NotificationState) => {
        state.unreadCount = unreadCount;
      }, false, "notification/setUnreadCount");
    },
    resetUnreadCount: () => {
      set((state: NotificationState) => {
        state.unreadCount = 0;
      }, false, "notification/resetUnreadCount");
    },
  },
});

const useNotificationStore = create<NotificationState>()(
  immer(process.env.NODE_ENV !== "production" ? devtools(store) : store)
);

export default useNotificationStore;
