import { useRef } from "react";

export default function useSigninFieldRef() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const googleLoginBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  return {
    emailRef,
    googleLoginBtnRef,
    closeBtnRef,
  };
}
