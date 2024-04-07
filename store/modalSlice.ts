import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    isOpenNotification: false,
  },
  reducers: {
    openNotification: (state) => {
      state.isOpenNotification = true;
    },
    closeNotificaiton: (state) => {
      state.isOpenNotification = false;
    },
  },
});
