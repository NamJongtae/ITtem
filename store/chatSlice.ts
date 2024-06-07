import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chatRoomIds: [],
  },
  reducers: {
    saveChatRoomIds: (state, action) => {
      state.chatRoomIds = action.payload;
    },
    resetLocation: (state) => {
      state.chatRoomIds = [];
    },
  },
});
