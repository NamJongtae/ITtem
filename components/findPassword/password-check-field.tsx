import React, { useEffect } from "react";
import CoreInputField from "../commons/coreInputField/core-input-field";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function PasswordCheckField() {
  const { watch, clearErrors, setError } = useFormContext();
  const passwordValue = watch("password");
  const passwordCheckValue = watch("password-check");

  const isVerifyEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );

  useEffect(() => {
    if (passwordValue === passwordCheckValue) {
      clearErrors("password-check");
    } else {
      setError("password-check", {
        type: "validate",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  }, [passwordValue, passwordCheckValue, clearErrors, setError]);

  return (
    isVerifyEmail && (
      <div>
        <CoreInputField
          label="비밀번호 확인"
          inputId="password-check"
          inputName="password-check"
          inputType="password"
          inputPlaceholder="비밀번호 확인을 입력하세요."
          inputMinLength={8}
          inputMaxLength={16}
          inputRequired={"비밀번호 확인을 입력하세요."}
          inputValidate={(vaule) => {
            if (vaule !== passwordValue) return "비밀번호가 일치하지 않습니다.";
          }}
          inputPattern={{
            value: PASSWORD_REGEX,
            message: PASSWORD_REGEX_ERRORMSG,
          }}
        />
      </div>
    )
  );
}
