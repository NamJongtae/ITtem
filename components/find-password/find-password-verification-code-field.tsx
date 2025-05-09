import VerificationCodeInput from "../signup/basic-info-step/signup-verification-code-input";
import EmailVerificationBtn from "../signup/basic-info-step/signup-email-verification-Btn";
import VerificationCodeBtns from "../signup/basic-info-step/signup-verification-code-btns";
import useVerificationEmailHandler from "@/hooks/signup/basic-info/useVerificationEmailHandler";
import useEmailStatus from "@/hooks/signup/basic-info/useEmailStatus";
import useVerificationEmailResendHandler from "@/hooks/signup/basic-info/useVerificationEmailResendHandler";
import useVerificationCodeStatus from "@/hooks/signup/basic-info/useVerificationCodeStatus";
import useResetVerificationEmail from "@/hooks/signup/basic-info/useResetVerificationEmail";
import useVerificationCodeFocus from "@/hooks/signup/basic-info/useVerificationCodeFocus";

export default function FindPasswordVerificationCodeField() {
  const { errors } = useVerificationCodeStatus();
  const { handleClickVerificationEmail, verificationEmailLoading } =
  useVerificationEmailHandler("resetPw");
  const { isSendToVerificationEmail, isVerifiedEmail } = useEmailStatus();
  const { resetSendToVerificationEmail } = useResetVerificationEmail();
  const { requestSendToVerificationEmail } = useVerificationEmailResendHandler("resetPw");
  const { verificationCodeRef } = useVerificationCodeFocus();

  return (
    isSendToVerificationEmail &&
    !isVerifiedEmail && (
      <div>
        <div className="flex gap-2 items-center mt-3">
          <label className="sr-only" htmlFor="verificationCode">
            인증코드
          </label>

          <VerificationCodeInput verificationCodeRef={verificationCodeRef} />

          <EmailVerificationBtn
            handleClickVerificationEmail={handleClickVerificationEmail}
            verificationEmailLoading={verificationEmailLoading}
          />
        </div>

        {errors && (
          <p className="input_error">
            {typeof errors.message === "string" && errors.message}
          </p>
        )}

        <VerificationCodeBtns
          requestSendToVerificationEmail={requestSendToVerificationEmail}
          resetSendToVerificationEmail={resetSendToVerificationEmail}
          verificationCodeRef={verificationCodeRef}
        />
      </div>
    )
  );
}
