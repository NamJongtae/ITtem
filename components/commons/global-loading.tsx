"use client";

import useGlobalLoadingStore from "@/store/global-loging-store";
import Loading from "./loading";
import useBodyOverflow from "@/hooks/commons/useBodyOverflow";

export default function GlobalLoading() {
  const { isLoading } = useGlobalLoadingStore();
  useBodyOverflow({ isLocked: isLoading });
  return isLoading ? <Loading /> : null;
}
