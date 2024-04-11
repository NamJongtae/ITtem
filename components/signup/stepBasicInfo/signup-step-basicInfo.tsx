import useVerifyEmailCounter from "@/hooks/useVerifyEmailCounter";
import EmailField from "./email-field";
import PasswordField from "./password-field";
import StepBasicInfoBtns from "./step-BasicInfo-btns";
import VerifyCodeField from "./verifyCode-field";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import useSendToVerifyEmail from "@/hooks/useSendToVerifyEmail";

interface IProps {
  nextStepHandler: () => void;
}

export default function SignupStepBasicInfo({ nextStepHandler }: IProps) {
  const {
    isSendToVerifyEmail,
    handleClickSendToEmail,
    SendToVerifyEmailLoading,
    resetSendToVerifyEmail,
    emailRef,
    sendToVerifyEmailError,
    requestSendToVerifyEmail,
  } = useSendToVerifyEmail();

  const { verifiedEmail, handleClickVerifyEmail, verifyCodeRef } =
    useVerifyEmail(isSendToVerifyEmail);

  const { counter } = useVerifyEmailCounter(
    isSendToVerifyEmail,
    verifiedEmail,
    sendToVerifyEmailError,
    SendToVerifyEmailLoading
  );

  return (
    <div className="flex flex-col gap-3">
      <EmailField
        isSendToVerifyEmail={isSendToVerifyEmail}
        handleClickSendToEmail={handleClickSendToEmail}
        emailRef={emailRef}
      />
      
      {isSendToVerifyEmail && !verifiedEmail && (
        <VerifyCodeField
          counter={counter}
          handleClickVerifyEmail={handleClickVerifyEmail}
          verifyCodeRef={verifyCodeRef}
          requestSendToVerifyEmail={requestSendToVerifyEmail}
          resetSendToVerifyEmail={resetSendToVerifyEmail}
          SendToVerifyEmailLoading={SendToVerifyEmailLoading}
        />
      )}

      <PasswordField />
      <StepBasicInfoBtns nextStepHandler={nextStepHandler} />
    </div>
  );
}
