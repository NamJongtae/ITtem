import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function usePasswordChkFieldValidator() {
  const { watch, clearErrors, setError } = useFormContext();
  const passwordValue = watch("password");
  const passwordCheckValue = watch("password-check");

  useEffect(() => {
    if (
      passwordValue.length >= 8 &&
      passwordCheckValue.length >= 8 &&
      passwordValue !== passwordCheckValue
    ) {
      setError("password-check", {
        type: "validate",
        message: "비밀번호가 일치하지 않습니다."
      });
    } else {
      clearErrors("password-check");
    }
  }, [passwordValue, passwordCheckValue, clearErrors, setError]);

  return { passwordValue, passwordCheckValue };
}
