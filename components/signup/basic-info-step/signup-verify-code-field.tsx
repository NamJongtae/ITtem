import VerifyCodeInput from "./signup-verify-code-input";
import VerifyCodeBtns from "./signup-verify-code-btns";
import EmailVerifyBtn from "./signup-email-verify-Btn";
import useVerificationCodeFocus from "@/hooks/signup/basic-info/useVerificationCodeFocus";
import useVerificationEmailHandler from "@/hooks/signup/basic-info/useVerificationEmailHandler";
import useVerificationnEmailResendHandler from "@/hooks/signup/basic-info/useVerificationnEmailResendHandler";
import useEmailStatus from "@/hooks/signup/basic-info/useEmailStatus";
import useResetVerificationEmail from "@/hooks/signup/basic-info/useResetVerificationEmail";
import useVerificationCodeStatus from "@/hooks/signup/basic-info/useVerificationCodeStatus";

export default function SignupVerifyCodeField() {
  const { verifyCodeRef } = useVerificationCodeFocus();
  const { handleClickVerifyEmail, verfiyEmailLoading } =
    useVerificationEmailHandler(false);
  const { requestSendToVerifyEmail } =
    useVerificationnEmailResendHandler(false);
  const { isSendToVerifyEmail, isVerifiedEmail } = useEmailStatus();
  const { resetSendToVerifyEmail } = useResetVerificationEmail();
  const { errors } = useVerificationCodeStatus();

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
