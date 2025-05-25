"use client";

import useGlobalLoadingStore from "../store/globalLogingStore";
import Loading from "./Loading";
import useBodyOverflow from "@/shared/common/hooks/useBodyOverflow";

export default function GlobalLoading() {
  const { isLoading } = useGlobalLoadingStore();
  useBodyOverflow({ isLocked: isLoading });
  return isLoading ? <Loading /> : null;
}
