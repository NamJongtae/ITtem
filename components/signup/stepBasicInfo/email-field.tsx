import EmailInput from "./email-input";
import EmailError from "./email-error";
import useSendToVerifyEmail from "@/hooks/useSendToVerifyEmail";
import EmailVerifyBtn from "./emailVerify-Btn";

export default function EmailField() {
  const { isSendToVerifyEmail, handleClickSendToEmail, emailRef } =
    useSendToVerifyEmail();

  return (
    <div>
      <label className="sr-only" htmlFor="email">
        이메일
      </label>
      <div className="flex gap-3 items-center">
        <EmailInput
          isSendToVerifyEmail={isSendToVerifyEmail}
          emailRef={emailRef}
        />
        
        {!isSendToVerifyEmail && (
          <EmailVerifyBtn handleClickVerifyEmail={handleClickSendToEmail} />
        )}
      </div>

      <EmailError />
    </div>
  );
}
