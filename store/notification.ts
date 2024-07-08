import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    unreadCount: 0,
  },
  reducers: {
    saveUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    },
  },
});
