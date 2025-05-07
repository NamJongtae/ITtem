import VerifyCodeInput from "./signup-verify-code-input";
import VerifyCodeBtns from "./signup-verify-code-btns";
import EmailVerifyBtn from "./signup-email-verify-Btn";
import useVerifyCodeStatus from "@/hooks/signup/basic-info/useVerifyCodeStatus";
import useEmailStatus from "@/hooks/signup/basic-info/useEmailStatus";
import useVerifyEmailHandler from "@/hooks/signup/basic-info/useVerifyEmailHandler";
import useRequestSendToVerifyEmailHandler from "@/hooks/signup/basic-info/useRequestSendToVerifyEmailHandler";
import useVerifyCodeInputFocus from "@/hooks/signup/basic-info/useVerifyCodeFocus";

export default function SignupVerifyCodeField() {
  const { verifyCodeRef } = useVerifyCodeInputFocus();
  const { handleClickVerifyEmail, verfiyEmailLoading } =
    useVerifyEmailHandler(false);
  const { requestSendToVerifyEmail } =
    useRequestSendToVerifyEmailHandler(false);
  const { isSendToVerifyEmail, isVerifiedEmail, resetSendToVerifyEmail } =
    useEmailStatus();
  const { errors } = useVerifyCodeStatus();

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

          {errors && (
            <p className="input_error">
              {typeof errors.message === "string" && errors.message}
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
