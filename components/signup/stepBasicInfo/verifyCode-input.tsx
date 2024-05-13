import CoreInputField from "@/components/commons/coreInputField/core-input-field";
import { MutableRefObject, useEffect, useState } from "react";
import VerfiyCodeCounter from "./verfiyCode-counter";
import {
  VERIFYCODE_REGEX,
  VERIFYCODE_REGEX_ERRORMSG,
} from "@/constants/constant";

interface IProps {
  verifyCodeRef: MutableRefObject<HTMLInputElement | null>;
}

export default function VerifyCodeInput({ verifyCodeRef }: IProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div
      className={`${
        isFocus && "outline outline-2"
      } relative flex items-center w-full border rounded-md`}
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
        inputOnFocus={() => {
          setIsFocus(true);
        }}
        inputPattern={{
          value: VERIFYCODE_REGEX,
          message: VERIFYCODE_REGEX_ERRORMSG,
        }}
        inputOnBlur={() => setIsFocus(false)}
        inputValidate={(value) => value.length === 6}
        inputRef={verifyCodeRef}
      />
      <VerfiyCodeCounter />
    </div>
  );
}
