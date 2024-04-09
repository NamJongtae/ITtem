import useVerifyEmailCounter from "@/hooks/useVerifyEmailCounter";
import useSendToVerifyEmail from "@/hooks/useSendToVerifyEmail";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import useEmailInput from "@/hooks/useEmailInput";
import EmailInput from "./email-input";
import VerifyNumberInput from "./verifyNumber-input";
import EmailError from "./email-error";
import VerifyNumberBtns from "./verifyNumber-btns";


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

  const { verifiedEmail, handleClickVerifyEmail, verifyNumberRef } =
    useVerifyEmail(isSendToVerifyEmail);

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
        <VerifyNumberInput
          handleClickVerifyEmail={handleClickVerifyEmail}
          counter={counter}
          verifyNumberRef={verifyNumberRef}
        />
      )}

      {isSendToVerifyEmail && !verifiedEmail && (
        <VerifyNumberBtns
          requestSendToVerifyEmail={requestSendToVerifyEmail}
          resetSendToVerifyEmail={resetSendToVerifyEmail}
          SendToVerifyEmailLoading={SendToVerifyEmailLoading}
        />
      )}

      <EmailError emailError={emailError} />
    </div>
  );
}
