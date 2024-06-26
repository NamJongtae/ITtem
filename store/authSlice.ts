import { AuthData } from '@/types/authTypes';
import { createSlice } from "@reduxjs/toolkit";

const isClient = typeof window !== "undefined";

// 클라이언트 환경에서만 localStorage에 접근합니다.
const storedUser = isClient
  ? JSON.parse(localStorage.getItem("uid") || "null")
  : null;

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: storedUser as AuthData | null,
    isLoading: true,
  },
  reducers: {
    saveAuth: (
      state,
      action: {
        payload: {
          uid: string;
          nickname: string;
          email: string;
          profileImg: string;
        };
        type: string;
      }
    ) => {
      state.user = action.payload;
      if (isClient) {
        localStorage.setItem("uid", JSON.stringify(action.payload));
      }
    },
    resetAuth: (state) => {
      state.user = null;
      if (isClient) {
        localStorage.removeItem("uid");
      }
    },
    setIsLoading: (state, action: { payload: boolean; type: string }) => {
      state.isLoading = action.payload;
    },
  },
});
