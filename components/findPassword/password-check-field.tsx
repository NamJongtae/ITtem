import CoreInputField from "../commons/coreInputField/core-input-field";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import usePasswordChkField from "@/hooks/findPassword/usePasswordChkField";

export default function PasswordCheckField() {
  const { isVerifyEmail, passwordValue } = usePasswordChkField();

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
