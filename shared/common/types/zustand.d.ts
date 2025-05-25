// src/types/zustand.d.ts
import { StateCreator } from "zustand";

// <State Type, Middleware>
declare module "zustand" {
  type ImmerDevtoolsStateCreator<T> = StateCreator<
    T,
    [["zustand/immer", never], ["zustand/devtools", never]]
  >;
}
