import { RootState } from "@/store";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export default function usePasswordChkField() {
  const { watch, clearErrors, setError } = useFormContext();
  const passwordValue = watch("password");
  const passwordCheckValue = watch("password-check");

  const isVerifyEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );

  useEffect(() => {
    if (
      passwordValue.length >= 8 &&
      passwordCheckValue.length >= 8 &&
      passwordValue !== passwordCheckValue
    ) {
      setError("password-check", {
        type: "validate",
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("password-check");
    }
  }, [passwordValue, passwordCheckValue, clearErrors, setError]);

  return { isVerifyEmail, passwordValue, passwordCheckValue };
}
