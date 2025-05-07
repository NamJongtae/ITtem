import VerifyCodeInput from "../signup/basic-info-step/signup-verify-code-input";
import EmailVerifyBtn from "../signup/basic-info-step/signup-email-verify-Btn";
import VerifyCodeBtns from "../signup/basic-info-step/signup-verify-code-btns";
import useVerifyCodeStatus from "@/hooks/signup/basic-info/useVerifyCodeStatus";
import useRequestSendToVerifyEmailHandler from "@/hooks/signup/basic-info/useRequestSendToVerifyEmailHandler";
import useVerifyCodeInputFocus from "@/hooks/signup/basic-info/useVerifyCodeFocus";
import useEmailStatus from "@/hooks/signup/basic-info/useEmailStatus";
import useVerifyEmailHandler from "@/hooks/signup/basic-info/useVerifyEmailHandler";
import useResetVerifyEmail from "@/hooks/signup/basic-info/useResetVerifyEmail";

export default function FindPasswordVerifyCodeField() {
  const { errors } = useVerifyCodeStatus();
  const { handleClickVerifyEmail, verfiyEmailLoading } =
    useVerifyEmailHandler(true);
  const { isSendToVerifyEmail, isVerifiedEmail } = useEmailStatus();
  const { resetSendToVerifyEmail } = useResetVerifyEmail();
  const { requestSendToVerifyEmail } = useRequestSendToVerifyEmailHandler(true);
  const { verifyCodeRef } = useVerifyCodeInputFocus();

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
