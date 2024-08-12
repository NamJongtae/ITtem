import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface ChatState {
  chatRoomIds: string[];
  chatRoomIdsLoading: boolean;
  totalMessageCount: number;
  actions: {
    saveChatRoomIds: (chatRoomIds: string[]) => void;
    resetChatRoomId: () => void;
    setTotalMessageCount: (totalMessageCount: number) => void;
    resetTotalMessageCount: () => void;
    setChatRoomIdsLoading: (isLoading: boolean) => void;
    resetChatState: () => void;
  };
}

export const store = (set: any): ChatState => ({
  chatRoomIds: [],
  chatRoomIdsLoading: true,
  totalMessageCount: 0,
  actions: {
    saveChatRoomIds: (chatRoomIds: string[]) => {
      set(
        (state: ChatState) => {
          state.chatRoomIds = chatRoomIds;
        },
        false,
        "chat/saveChatRoomIds"
      );
    },
    resetChatRoomId: () => {
      set(
        (state: ChatState) => {
          state.chatRoomIds = [];
        },
        false,
        "chat/resetChatRoomId"
      );
    },
    setTotalMessageCount: (totalMessageCount: number) => {
      set(
        (state: ChatState) => {
          state.totalMessageCount = totalMessageCount;
        },
        false,
        "chat/setTotalMessageCount"
      );
    },
    resetTotalMessageCount: () => {
      set(
        (state: ChatState) => {
          state.totalMessageCount = 0;
        },
        false,
        "chat/resetTotalMessageCount"
      );
    },
    setChatRoomIdsLoading: (isLoading: boolean) => {
      set(
        (state: ChatState) => {
          state.chatRoomIdsLoading = isLoading;
        },
        false,
        "chat/setChatRoomIdsLoading"
      );
    },
    resetChatState: () => {
      set(
        (state: ChatState) => {
          state.chatRoomIds = [];
          state.totalMessageCount = 0;
          state.chatRoomIdsLoading = true;
        },
        false,
        "chat/resetChatState"
      );
    }
  }
});

const useChatStore = create<ChatState>()(
  immer(process.env.NODE_ENV !== "production" ? devtools(store) : store)
);

export default useChatStore;
