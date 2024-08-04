import CoreInputField from "../commons/core-input-field/core-input-field";
import SendVerifyEmailBtn from "../signup/basic-info-step/signup-send-verify-email-btn";
import EmailError from "../signup/basic-info-step/signup-email-error";
import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "@/constants/constant";
import useEmailField from "@/hooks/find-password/useEmailField";

export default function FindPasswordEmailField() {
  const {
    isSendToVerifyEmail,
    handleClickSendToVerifyEmail,
    emailRef,
    isVerifyEmail,
  } = useEmailField();

  return (
    !isVerifyEmail && (
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
              message: EMAIL_REGEX_ERRORMSG,
            }}
            hideError={true}
            inputRef={emailRef}
          />

          {!isSendToVerifyEmail && (
            <SendVerifyEmailBtn
              handleClickSendToVerifyEmail={handleClickSendToVerifyEmail}
            />
          )}
        </div>
        <EmailError />
      </div>
    )
  );
}
