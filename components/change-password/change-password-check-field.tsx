import CoreInputField from "../commons/core-input-field/core-input-field";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import usePasswordChkValidation from "@/hooks/change-password-modal/usePasswordChkValidation";
import { MutableRefObject, forwardRef } from "react";

const ChangePasswordPasswordCheckField = forwardRef<HTMLInputElement | null>(
  (props, ref) => {
    const { passwordValue } = usePasswordChkValidation();

    return (
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
          inputPattern={{
            value: PASSWORD_REGEX,
            message: PASSWORD_REGEX_ERRORMSG,
          }}
          inputValidate={(value) =>
            value === passwordValue ? true : "비밀번호가 일치하지 않습니다."
          }
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

ChangePasswordPasswordCheckField.displayName =
  "ChangePasswordModalPwCheckField";
export default ChangePasswordPasswordCheckField;
