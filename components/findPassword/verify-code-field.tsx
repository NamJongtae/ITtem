import React from "react";
import VerifyCodeInput from "../signup/stepBasicInfo/verifyCode-input";
import EmailVerifyBtn from "../signup/stepBasicInfo/email-verify-Btn";
import VerifyCodeBtns from "../signup/stepBasicInfo/verifyCode-btns";
import useVerifyCodeField from "@/hooks/findPassword/useVerifyCodeField";

export default function VerifyCodeField() {
  const {
    handleClickVerifyEmail,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verifyCodeRef,
    verfiyEmailLoading,
    error,
    isSendToVerifyEmail,
    isVerifiedEmail,
  } = useVerifyCodeField();

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
    )
  );
}
