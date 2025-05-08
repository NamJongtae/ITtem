import { useRef } from "react";

export default function useChangePasswordRef() {
  const currentPwRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);
  const pwCheckRef = useRef<HTMLInputElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  return { currentPwRef, pwRef, pwCheckRef, closeBtnRef, submitBtnRef };
}
