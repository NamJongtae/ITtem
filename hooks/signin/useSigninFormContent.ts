import { useRef } from "react";
import { useFocusing } from "../commons/useFocusing";

export default function useSigninFormContent() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const googleLoginBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useFocusing(emailRef);

  return {
    emailRef,
    googleLoginBtnRef,
    closeBtnRef,
  };
}
