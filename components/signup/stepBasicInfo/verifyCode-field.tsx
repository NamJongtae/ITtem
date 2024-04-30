import VerifyCodeInput from "./verifyCode-input";
import VerifyCodeBtns from "./verifyCode-btns";
import EmailVerifyBtn from "./email-verify-Btn";
import useVerifyEmail from "@/hooks/signup/useVerifyEmail";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFormContext } from "react-hook-form";

export default function VerifyCodeField() {
  const {
    handleClickVerifyEmail,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verifyCodeRef,
    verfiyEmailLoading,
  } = useVerifyEmail();

  const isSendToVerifyEmail = useSelector(
    (state: RootState) => state.signup.isSendToVerifyEmail
  );
  const isVerifiedEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );

  const { formState } = useFormContext();

  const error = formState.errors["verifyCode"];

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
