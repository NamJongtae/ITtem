import VerificationCodeInput from "./signup-verification-code-input";
import VerificationCodeBtns from "./signup-verification-code-btns";
import EmailVerificationBtn from "./signup-email-verification-Btn";
import useVerificationCodeFocus from "@/hooks/signup/basic-info/useVerificationCodeFocus";
import useVerificationEmailHandler from "@/hooks/signup/basic-info/useVerificationEmailHandler";
import useVerificationEmailResendHandler from "@/hooks/signup/basic-info/useVerificationEmailResendHandler";
import useEmailStatus from "@/hooks/signup/basic-info/useEmailStatus";
import useResetVerificationEmail from "@/hooks/signup/basic-info/useResetVerificationEmail";
import useVerificationCodeStatus from "@/hooks/signup/basic-info/useVerificationCodeStatus";

export default function SignupVerificationCodeField() {
  const { verificationCodeRef } = useVerificationCodeFocus();
  const { handleClickVerificationEmail, verificationEmailLoading } =
    useVerificationEmailHandler(false);
  const { requestSendToVerificationEmail } = useVerificationEmailResendHandler(false);
  const { isSendToVerificationEmail, isVerifiedEmail } = useEmailStatus();
  const { resetSendToVerificationEmail } = useResetVerificationEmail();
  const { errors } = useVerificationCodeStatus();

  return (
    isSendToVerificationEmail &&
    !isVerifiedEmail && (
      <>
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
      </>
    )
  );
}
