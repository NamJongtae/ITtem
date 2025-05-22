import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "../../constants/constansts";
import CoreInputField from "@/components/core-input-field/core-input-field";
import { RefObject } from "react";
import { optimizationTabFocus } from "@/utils/optimizationKeyboard";

interface IProps {
  isModal?: boolean;
  emailRef: RefObject<HTMLInputElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
}
export default function SigninEmailField({
  isModal,
  emailRef,
  closeBtnRef
}: IProps) {
  return (
    <div className="mb-2">
      <CoreInputField
        label="email"
        inputId="email"
        inputName="email"
        inputType="text"
        inputPattern={{
          value: EMAIL_REGEX,
          message: EMAIL_REGEX_ERRORMSG
        }}
        inputRequired={"이메일을 입력해주세요."}
        inputPlaceholder={"이메일을 입력해주세요."}
        inputRef={emailRef}
        inputKeydown={
          isModal
            ? (e) =>
                optimizationTabFocus({
                  event: e,
                  previousTarget: closeBtnRef.current
                })
            : undefined
        }
      />
    </div>
  );
}
