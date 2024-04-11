import useVerifyEmailCounter from "@/hooks/useVerifyEmailCounter";
import useSendToVerifyEmail from "@/hooks/useSendToVerifyEmail";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import EmailInput from "./email-input";
import VerifyCodeInput from "./verifyCode-input";
import EmailError from "./email-error";
import VerifyCodeBtns from "./verifyCode-btns";

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

  return (
    <div>
      <EmailInput
        isSendToVerifyEmail={isSendToVerifyEmail}
        handleClickSendToEmail={handleClickSendToEmail}
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

      <EmailError />
    </div>
  );
}
