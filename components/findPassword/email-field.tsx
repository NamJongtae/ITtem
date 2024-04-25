import React from "react";
import CoreInputField from "../commons/coreInputField/core-input-field";
import SendVerifyEmailBtn from "../signup/stepBasicInfo/send-verify-email-btn";
import EmailError from "../signup/stepBasicInfo/email-error";
import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "@/constants/constant";
import useSendToVerifyEmail from "@/hooks/useSendToVerifyEmail";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function EmailField() {
  const { isSendToVerifyEmail, handleClickSendToVerifyEmail, emailRef } =
    useSendToVerifyEmail(true);

  const isVerifyEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );

  return (
    !isVerifyEmail && (
      <>
        <div className="flex gap-3 items-center">
          <CoreInputField
            label="이메일"
            inputId="email"
            inputName="email"
            inputType="email"
            inputPlaceholder="이메일을 입력해주세요."
            inputRequired="이메일을 입력해주세요."
            inputReadOnly={isSendToVerifyEmail}
            inputPattern={{
              value: EMAIL_REGEX,
              message: EMAIL_REGEX_ERRORMSG,
            }}
            hideError={true}
            inputRef={emailRef}
          />

          {!isSendToVerifyEmail && (
            <SendVerifyEmailBtn
              handleClickSendToVerifyEmail={handleClickSendToVerifyEmail}
            />
          )}
        </div>
        <EmailError />
      </>
    )
  );
}
