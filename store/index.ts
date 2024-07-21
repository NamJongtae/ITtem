import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducer from "./reducers";

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV !== "production"
        ? getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
