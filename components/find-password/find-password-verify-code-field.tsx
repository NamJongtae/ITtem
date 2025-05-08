import VerifyCodeInput from "../signup/basic-info-step/signup-verify-code-input";
import EmailVerifyBtn from "../signup/basic-info-step/signup-email-verify-Btn";
import VerifyCodeBtns from "../signup/basic-info-step/signup-verify-code-btns";
import useVerifyEmailHandler from "@/hooks/signup/basic-info/useVerificationEmailHandler";
import useEmailStatus from "@/hooks/signup/basic-info/useEmailStatus";
import useVerifciationEmailResendHandler from "@/hooks/signup/basic-info/useVerificationnEmailResendHandler";
import useVerificationCodeStatus from "@/hooks/signup/basic-info/useVerificationCodeStatus";
import useResetVerificationEmail from "@/hooks/signup/basic-info/useResetVerificationEmail";
import useVerificationCodeFocus from "@/hooks/signup/basic-info/useVerificationCodeFocus";

export default function FindPasswordVerifyCodeField() {
  const { errors } = useVerificationCodeStatus();
  const { handleClickVerifyEmail, verfiyEmailLoading } =
    useVerifyEmailHandler(true);
  const { isSendToVerifyEmail, isVerifiedEmail } = useEmailStatus();
  const { resetSendToVerifyEmail } = useResetVerificationEmail();
  const { requestSendToVerifyEmail } = useVerifciationEmailResendHandler(true);
  const { verifyCodeRef } = useVerificationCodeFocus();

  return (
    isSendToVerifyEmail &&
    !isVerifiedEmail && (
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
    )
  );
}
