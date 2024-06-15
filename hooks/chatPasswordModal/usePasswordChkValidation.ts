import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function usePasswordChkValidation() {
  const { watch, clearErrors, setError } = useFormContext();
  const passwordCheckValue = watch("password-check");
  const passwordValue = watch("password");

  useEffect(() => {
    if (
      passwordValue.length >= 8 &&
      passwordCheckValue.length >= 8 &&
      passwordValue !== passwordCheckValue
    ) {
      setError("password-check", {
        type: "validate",
        message: "비밀번호가 일치하지 않아요.",
      });
    } else {
      clearErrors("password-check");
    }
  }, [passwordValue, passwordCheckValue, setError, clearErrors]);

  return { passwordValue, passwordCheckValue };
}
