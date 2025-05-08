import CoreInputField from "@/components/commons/core-input-field/core-input-field";
import { MutableRefObject } from "react";
import VerfiyCodeCounter from "./signup-verfiy-code-counter";
import {
  VERIFYCODE_REGEX,
  VERIFYCODE_REGEX_ERRORMSG
} from "@/constants/constant";
import useVerificationCodeFocusController from "@/hooks/signup/basic-info/useVerificationCodeFocusController";
import useResetInputOnTimerEnd from "@/hooks/signup/basic-info/useResetInputOnTimerEnd";

interface IProps {
  verifyCodeRef: MutableRefObject<HTMLInputElement | null>;
}

export default function SignupVerifyCodeInput({ verifyCodeRef }: IProps) {
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
        inputId="verifyCode"
        inputName="verifyCode"
        inputType="text"
        inputMinLength={6}
        inputMaxLength={6}
        inputRequired={"인증코드를 입력해주세요."}
        hideError={true}
        inputOnFocus={onFocus}
        inputPattern={{
          value: VERIFYCODE_REGEX,
          message: VERIFYCODE_REGEX_ERRORMSG
        }}
        inputOnBlur={onBlur}
        inputValidate={(value) => value.length === 6}
        inputRef={verifyCodeRef}
        disabled={timer <= 0}
      />
      <VerfiyCodeCounter />
    </div>
  );
}
