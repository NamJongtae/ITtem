import CoreInputField from "../commons/core-input-field/core-input-field";
import SendVerifyEmailBtn from "../signup/basic-info-step/signup-send-verify-email-btn";
import EmailError from "../signup/basic-info-step/signup-email-error";
import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "@/constants/constant";
import useEmailStatus from "@/hooks/signup/basic-info/useEmailStatus";
import { useEmailFocus } from "@/hooks/signup/basic-info/useEmailFocus";
import { useVerificationEmailSendHandler } from "@/hooks/signup/basic-info/useVerificationEmailSendHandler";
import { useEmailVerificationValidator } from "@/hooks/signup/basic-info/useEmailVerificationVaildator";

export default function FindPasswordEmailField() {
  const { validate } = useEmailVerificationValidator(true);
  const { isSendToVerifyEmail, isVerifiedEmail } = useEmailStatus();
  const { emailRef } = useEmailFocus();
  const { sendToEmailHandler } = useVerificationEmailSendHandler({
    validate,
    isFindPw: true
  });

  return (
    !isVerifiedEmail && (
      <div>
        <div className="flex gap-3 items-center">
          <CoreInputField
            label="이메일"
            inputId="email"
            inputName="email"
            inputType="email"
            inputPlaceholder="이메일을 입력해주세요."
            inputRequired="이메일을 입력해주세요."
            inputReadOnly={isSendToVerifyEmail}
            inputPattern={{
              value: EMAIL_REGEX,
              message: EMAIL_REGEX_ERRORMSG
            }}
            hideError={true}
            inputRef={emailRef}
          />

          {!isSendToVerifyEmail && (
            <SendVerifyEmailBtn sendToEmailHandler={sendToEmailHandler} />
          )}
        </div>
        <EmailError />
      </div>
    )
  );
}
