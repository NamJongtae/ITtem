import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState: {
    location: "",
  },
  reducers: {
    saveLocation: (state, action) => {
      state.location = action.payload;
    },
    resetLocation: (state) => {
      state.location = "";
    },
  },
});
