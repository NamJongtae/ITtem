import React, { forwardRef, MutableRefObject, Ref } from "react";
import CoreInputField from "../../commons/coreInputField/core-input-field";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";

interface IProps {
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
  cancelBtnRef: MutableRefObject<HTMLButtonElement | null>;
}
const ChangePasswordModalCurrentPwField = forwardRef<
  HTMLInputElement | null,
  IProps
>(({ submitBtnRef, cancelBtnRef }, ref) => {
  return (
    <div>
      <CoreInputField
        label="현재 비밀번호"
        inputId="current-password"
        inputName="current-password"
        inputType="password"
        inputPlaceholder="현재 비밀번호를 입력하세요."
        inputMinLength={8}
        inputMaxLength={16}
        inputRequired={"현재 비밀번호를 입력하세요."}
        inputPattern={{
          value: PASSWORD_REGEX,
          message: PASSWORD_REGEX_ERRORMSG,
        }}
        labelHidden={false}
        labelClassName="font-semibold"
        inputClassName={"border-b pb-3 w-full text-sm mt-4 focus:outline-none"}
        inputRef={ref as MutableRefObject<HTMLInputElement | null>}
        inputKeydown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: submitBtnRef.current?.disabled
              ? cancelBtnRef.current
              : submitBtnRef.current,
          })
        }
      />
    </div>
  );
});

ChangePasswordModalCurrentPwField.displayName =
  "ChangePasswordModalCurrentPwField";
export default ChangePasswordModalCurrentPwField;
