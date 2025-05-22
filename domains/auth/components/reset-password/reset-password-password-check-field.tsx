import CoreInputField from "@/components/core-input-field/core-input-field";
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERRORMSG
} from "../../constants/constansts";
import usePasswordChkField from "../../hooks/reset-password/usePasswordChkFieldValidator";
import useEmailVerificationStatus from "../../hooks/email-verification/useEmailVerificationStatus";

export default function ResetPasswordPasswordCheckField() {
  const { isVerifiedEmail } = useEmailVerificationStatus();
  const { passwordValue } = usePasswordChkField();

  return (
    isVerifiedEmail && (
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
            message: PASSWORD_REGEX_ERRORMSG
          }}
        />
      </div>
    )
  );
}
