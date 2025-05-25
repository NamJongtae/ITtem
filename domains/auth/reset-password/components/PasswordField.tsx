import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERRORMSG
} from "../../shared/common/constants/constansts";
import CoreInputField from "@/shared/core-input-field/components/CoreInputField";
import useEmailVerificationStatus from "../../shared/email-verification/hooks/useEmailVerificationStatus";

export default function PasswordField() {
  const { isVerifiedEmail } = useEmailVerificationStatus();

  return (
    isVerifiedEmail && (
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
            message: PASSWORD_REGEX_ERRORMSG
          }}
        />
      </div>
    )
  );
}
