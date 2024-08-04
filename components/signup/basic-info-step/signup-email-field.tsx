import SignupEmailError from "./signup-email-error";
import useSendToVerifyEmail from "@/hooks/signup/useSendToVerifyEmail";
import SignupSendVerifyEmailBtn from "./signup-send-verify-email-btn";
import CoreInputField from "@/components/commons/core-input-field/core-input-field";
import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "@/constants/constant";

export default function SignupEmailField() {
  const { isSendToVerifyEmail, handleClickSendToVerifyEmail, emailRef } =
    useSendToVerifyEmail();

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
          inputReadOnly={isSendToVerifyEmail}
          inputPattern={{
            value: EMAIL_REGEX,
            message: EMAIL_REGEX_ERRORMSG,
          }}
          hideError={true}
          inputRef={emailRef}
        />

        {!isSendToVerifyEmail && (
          <SignupSendVerifyEmailBtn
            handleClickSendToVerifyEmail={handleClickSendToVerifyEmail}
          />
        )}
      </div>

      <SignupEmailError />
    </div>
  );
}
