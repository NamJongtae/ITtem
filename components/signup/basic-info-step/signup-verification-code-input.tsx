import CoreInputField from "@/components/commons/core-input-field/core-input-field";
import { MutableRefObject } from "react";
import VerfiyCodeCounter from "./signup-verification-code-counter";
import {
  VERIFICATION_CODE_REGEX,
  VERIFICATION_CODE_REGEX_ERRORMSG
} from "@/constants/constant";
import useVerificationCodeFocusController from "@/hooks/signup/basic-info/useVerificationCodeFocusController";
import useResetInputOnTimerEnd from "@/hooks/signup/basic-info/useResetInputOnTimerEnd";

interface IProps {
  verificationCodeRef: MutableRefObject<HTMLInputElement | null>;
}

export default function SignupVerificationCodeInput({ verificationCodeRef }: IProps) {
  const { isFocus, onFocus, onBlur } = useVerificationCodeFocusController();
  const { timer } = useResetInputOnTimerEnd();

  return (
    <div
      className={`${
        isFocus && "outline outline-2"
      } ${timer <= 0 && "bg-gray-100 cursor-default"} relative flex items-center w-full border rounded-md`}
    >
      <CoreInputField
        inputClassName="border-hidden focus:outline-none group root_input"
        label="인증코드"
        inputId="verificationCode"
        inputName="verificationCode"
        inputType="text"
        inputMinLength={6}
        inputMaxLength={6}
        inputRequired={"인증코드를 입력해주세요."}
        hideError={true}
        inputOnFocus={onFocus}
        inputPattern={{
          value: VERIFICATION_CODE_REGEX,
          message: VERIFICATION_CODE_REGEX_ERRORMSG
        }}
        inputOnBlur={onBlur}
        inputValidate={(value) => value.length === 6}
        inputRef={verificationCodeRef}
        disabled={timer <= 0}
      />
      <VerfiyCodeCounter />
    </div>
  );
}
