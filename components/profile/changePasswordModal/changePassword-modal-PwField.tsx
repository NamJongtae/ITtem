import { MutableRefObject, forwardRef } from "react";
import usePasswordValidation from "@/hooks/changePasswordModal/usePasswordValidation";
import CoreInputField from "@/components/commons/coreInputField/core-input-field";

const ChangePasswordModalPwField = forwardRef<HTMLInputElement | null>(
  (props, ref) => {
    const { validatePassword, PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } =
      usePasswordValidation();

    return (
      <div>
        <CoreInputField
          label="비밀번호"
          inputId="password"
          inputName="password"
          inputType="password"
          inputPlaceholder="비밀번호를 입력하세요."
          inputMinLength={8}
          inputMaxLength={16}
          inputRequired={"비밀번호를 입력하세요."}
          inputPattern={{
            value: PASSWORD_REGEX,
            message: PASSWORD_REGEX_ERRORMSG,
          }}
          inputValidate={validatePassword}
          labelHidden={false}
          labelClassName="font-semibold"
          inputClassName={
            "border-b pb-3 w-full text-sm mt-4 focus:outline-none"
          }
          inputRef={ref as MutableRefObject<HTMLInputElement | null>}
        />
      </div>
    );
  }
);
ChangePasswordModalPwField.displayName = "ChangePasswordModalPwField";
export default ChangePasswordModalPwField;
