import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import reducer from "./reducer";

function getServerState() {
  if (typeof document !== "undefined") {
    const element = document.querySelector("#__NEXT_DATA__");
    if (element) {
      const textContent = element.textContent;
      if (textContent) {
        return JSON.parse(textContent)?.props?.pageProps?.initialState;
      }
    }
  }
  return undefined;
}

const serverState = getServerState();

export const makeStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(),
    preloadedState: serverState,
  });

export default createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
