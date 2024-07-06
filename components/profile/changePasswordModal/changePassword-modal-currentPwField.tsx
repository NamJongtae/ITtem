import { forwardRef, MutableRefObject, Ref, useEffect } from "react";
import CoreInputField from "../../commons/coreInputField/core-input-field";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import { useFormContext } from "react-hook-form";
import useCurrentPwValidation from "@/hooks/changePasswordModal/useCurrentPwValidation";

interface IProps {
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
  closeBtnRef: MutableRefObject<HTMLButtonElement | null>;
}
const ChangePasswordModalCurrentPwField = forwardRef<
  HTMLInputElement | null,
  IProps
>(({ submitBtnRef, closeBtnRef }, ref) => {
  const { validatePassword } = useCurrentPwValidation();

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
        inputValidate={(value) => validatePassword(value)}
        labelHidden={false}
        labelClassName="font-semibold"
        inputClassName={"border-b pb-3 w-full text-sm mt-4 focus:outline-none"}
        inputRef={ref as MutableRefObject<HTMLInputElement | null>}
        inputKeydown={(e) =>
          optimizationTabFocus({
            event: e,
            previousTarget: closeBtnRef.current,
          })
        }
      />
    </div>
  );
});

ChangePasswordModalCurrentPwField.displayName =
  "ChangePasswordModalCurrentPwField";
export default ChangePasswordModalCurrentPwField;
