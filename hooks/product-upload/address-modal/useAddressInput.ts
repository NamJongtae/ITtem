import { useRef } from "react";

export function useAddressInput() {
  const addressRef = useRef<HTMLInputElement>(null);
  return { addressRef };
}
