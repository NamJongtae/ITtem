import SignupEmailError from "./signup-email-error";
import SignupSendVerificationEmailBtn from "./signup-send-verification-email-btn";
import CoreInputField from "@/components/commons/core-input-field/core-input-field";
import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "@/constants/constant";
import { useVerificationEmailSendHandler } from "@/hooks/signup/basic-info/useVerificationEmailSendHandler";

import { useResetEmailSendStatus } from "@/hooks/signup/basic-info/useResetEmailSendStatus";
import useEmailStatus from "@/hooks/signup/basic-info/useEmailStatus";
import { useEmailFocus } from "@/hooks/signup/basic-info/useEmailFocus";
import { useEmailVerificationValidator } from "@/hooks/signup/basic-info/useEmailVerificationVaildator";

export default function SignupEmailField() {
  const { validate } = useEmailVerificationValidator(false);
  const { sendToEmailHandler } = useVerificationEmailSendHandler({
    validate,
    isFindPw: false
  });
  const { isSendToVerificationEmail } = useEmailStatus();
  const { emailRef } = useEmailFocus();
  useResetEmailSendStatus();

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
          <SignupSendVerificationEmailBtn sendToEmailHandler={sendToEmailHandler} />
        )}
      </div>

      <SignupEmailError />
    </div>
  );
}
