import CoreInputField from "@/shared/core-input-field/components/CoreInputField";
import { RefObject, useContext } from "react";
import VerfiyCodeCounter from "./VerificationCodeCounter";
import {
  VERIFICATION_CODE_REGEX,
  VERIFICATION_CODE_REGEX_ERRORMSG
} from "../../common/constants/constansts";
import useVerificationCodeFocusController from "../hooks/useVerificationCodeFocusController";
import { EmailVerificationContext } from "../context/EmailVerificationProvider";

interface IProps {
  verificationCodeRef: RefObject<HTMLInputElement | null>;
}

export default function VerificationCodeInput({ verificationCodeRef }: IProps) {
  const { isFocus, onFocus, onBlur } = useVerificationCodeFocusController();
  const { timer } = useContext(EmailVerificationContext);

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
