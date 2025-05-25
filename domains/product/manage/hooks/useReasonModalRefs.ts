import { useRef } from "react";

export default function useReasonModalRefs() {
  const selectorRef = useRef<HTMLSelectElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  return {
    selectorRef,
    textareaRef,
    closeBtnRef,
    submitBtnRef,
  };
}
