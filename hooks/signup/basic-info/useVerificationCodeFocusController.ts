import { useState } from "react";

export default function useVerificationCodeFocusController() {
  const [isFocus, setIsFocus] = useState(false);
  const onFocus = () => {
    setIsFocus(true);
  };
  const onBlur = () => {
    setIsFocus(true);
  };
  return { isFocus, onFocus, onBlur };
}
