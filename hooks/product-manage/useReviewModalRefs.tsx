import { useRef } from "react";

export default function useReviewModalRefs() {
  const starRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  return { starRef, textareaRef, submitBtnRef, closeBtnRef };
}
