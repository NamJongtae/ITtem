import VerifyCodeInput from "./signup-verify-code-input";
import VerifyCodeBtns from "./signup-verify-code-btns";
import EmailVerifyBtn from "./signup-email-verify-Btn";
import useVerifyCodeField from "@/hooks/signup/useVerifyCodeField";

export default function SignupVerifyCodeField() {
  const {
    handleClickVerifyEmail,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verifyCodeRef,
    verfiyEmailLoading,
    isSendToVerifyEmail,
    isVerifiedEmail,
    error,
  } = useVerifyCodeField();

  return (
    isSendToVerifyEmail &&
    !isVerifiedEmail && (
      <>
        <div>
          <div className="flex gap-2 items-center mt-3">
            <label className="sr-only" htmlFor="verifyCode">
              인증코드
            </label>

            <VerifyCodeInput verifyCodeRef={verifyCodeRef} />

            <EmailVerifyBtn
              handleClickVerifyEmail={handleClickVerifyEmail}
              verfiyEmailLoading={verfiyEmailLoading}
            />
          </div>

          {error && (
            <p className="input_error">
              {typeof error.message === "string" && error.message}
            </p>
          )}

          <VerifyCodeBtns
            requestSendToVerifyEmail={requestSendToVerifyEmail}
            resetSendToVerifyEmail={resetSendToVerifyEmail}
            verifyCodeRef={verifyCodeRef}
          />
        </div>
      </>
    )
  );
}
