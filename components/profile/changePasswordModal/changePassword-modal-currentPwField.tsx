import React from "react";
import CoreInputField from "../../commons/coreInputField/core-input-field";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";

export default function ChangePasswordModalCurrentPwField() {
  return (
    <div>
      <CoreInputField
        label="현재 비밀번호"
        inputId="current-password"
        inputName="current-password"
        inputType="password"
        inputPlaceholder="현재 비밀번호를 입력하세요."
        inputMinLength={8}
        inputMaxLength={16}
        inputRequired={"현재 비밀번호를 입력하세요."}
        inputPattern={{
          value: PASSWORD_REGEX,
          message: PASSWORD_REGEX_ERRORMSG,
        }}
        labelHidden={false}
        labelClassName="font-semibold"
        inputClassName={"border-b pb-3 w-full text-sm mt-4 focus:outline-none"}
      />
    </div>
  );
}
