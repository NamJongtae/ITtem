import useVerifyEmailCounter from "@/hooks/useVerifyEmailCounter";
import useSendToVerifyEmail from "@/hooks/useSendToVerifyEmail";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import useEmailInput from "@/hooks/useEmailInput";
import EmailInput from "./email-input";
import VerifyCodeInput from "./verifyCode-input";
import EmailError from "./email-error";
import VerifyCodeBtns from "./verifyCode-btns";

export const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const emailRegexErrorMsg = "이메일 형식을 확인해주세요.";

export default function EmailField() {
  const {
    isSendToVerifyEmail,
    handleClickSendToEmail,
    SendToVerifyEmailLoading,
    resetSendToVerifyEmail,
    emailRef,
    sendToVerifyEmailError,
    requestSendToVerifyEmail,
  } = useSendToVerifyEmail();

  const {
    verifiedEmail,
    handleClickVerifyEmail,
    verifyCodeRef,
  } = useVerifyEmail(isSendToVerifyEmail);

  const { counter } = useVerifyEmailCounter(
    isSendToVerifyEmail,
    verifiedEmail,
    sendToVerifyEmailError,
    SendToVerifyEmailLoading
  );

  const { emailError, isEmailDirty, handleChangeEmail } = useEmailInput();

  return (
    <div>
      <EmailInput
        isSendToVerifyEmail={isSendToVerifyEmail}
        handleChangeEmail={handleChangeEmail}
        handleClickSendToEmail={handleClickSendToEmail}
        emailError={emailError}
        isEmailDirty={isEmailDirty}
        emailRef={emailRef}
      />

      {isSendToVerifyEmail && !verifiedEmail && (
        <VerifyCodeInput
          handleClickVerifyEmail={handleClickVerifyEmail}
          counter={counter}
          verifyCodeRef={verifyCodeRef}
        />
      )}

      {isSendToVerifyEmail && !verifiedEmail && (
        <VerifyCodeBtns
          requestSendToVerifyEmail={requestSendToVerifyEmail}
          resetSendToVerifyEmail={resetSendToVerifyEmail}
          SendToVerifyEmailLoading={SendToVerifyEmailLoading}
          verifyCodeRef={verifyCodeRef}
        />
      )}

      <EmailError emailError={emailError} />
    </div>
  );
}
