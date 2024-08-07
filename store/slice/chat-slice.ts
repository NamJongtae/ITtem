import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chatRoomIds: [],
    chatRoomIdsLoading: true,
    totalMessageCount: 0,
  },
  reducers: {
    saveChatRoomIds: (state, action) => {
      state.chatRoomIds = action.payload;
    },
    resetChatState: (state) => {
      state.chatRoomIds = [];
      state.totalMessageCount = 0;
      state.chatRoomIdsLoading = true;
    },
    resetChatRoomId: (state) => {
      state.chatRoomIds = [];
    },
    saveTotalMessageCount: (state, action) => {
      state.totalMessageCount = action.payload;
    },
    resetTotalMessageCount: (state) => {
      state.totalMessageCount = 0;
    },
    setChatRoomIdsLoading: (state, action) => {
      state.chatRoomIdsLoading = action.payload;
    },
  },
});
