import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState: {
    checkLoacation: false,
    location: "",
  },
  reducers: {
    saveLocation: (state, action) => {
      state.location = action.payload;
    },
    resetLocation: (state) => {
      state.location = "";
    },
    setCheckLocation: (state, action) => {
      state.checkLoacation = action.payload;
    },
  },
});
