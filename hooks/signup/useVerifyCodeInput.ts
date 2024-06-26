import { useState } from "react";

export default function useVerifyCodeInput() {
  const [isFocus, setIsFocus] = useState(false);
  const onFocus = () => {
    setIsFocus(true);
  };
  const onBlur = () => {
    setIsFocus(true);
  };
  return { isFocus, onFocus, onBlur };
}
