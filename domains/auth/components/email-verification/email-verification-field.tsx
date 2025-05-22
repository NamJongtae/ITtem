import SignupEmailError from "../signup/basic-info-step/signup-email-error";
import EmailVerificationSendBtn from "./email-verification-send-btn";
import CoreInputField from "@/components/core-input-field/core-input-field";
import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "../../constants/constansts";
import useEmailVerificationStatus from "../../hooks/email-verification/useEmailVerificationStatus";
import { useFocusEmailVerificationInput } from "../../hooks/email-verification/useFocusEmailVerificationInput";
import { EmailVerificationType } from "../../types/auth-types";

interface IProps {
  emailVerificationType: EmailVerificationType;
}

export default function EmailVerificationField({
  emailVerificationType
}: IProps) {
  const { isSendToVerificationEmail } = useEmailVerificationStatus();
  const { emailRef } = useFocusEmailVerificationInput();

  return (
    <div>
      <div className="flex gap-3 items-center">
        <CoreInputField
          label="이메일"
          inputId="email"
          inputName="email"
          inputType="email"
          inputPlaceholder="이메일을 입력해주세요."
          inputRequired="이메일을 입력해주세요."
          inputReadOnly={isSendToVerificationEmail}
          inputPattern={{
            value: EMAIL_REGEX,
            message: EMAIL_REGEX_ERRORMSG
          }}
          hideError={true}
          inputRef={emailRef}
        />

        {!isSendToVerificationEmail && (
          <EmailVerificationSendBtn
            emailVerificationType={emailVerificationType}
          />
        )}
      </div>

      <SignupEmailError />
    </div>
  );
}
