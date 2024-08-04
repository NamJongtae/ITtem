import { forwardRef, MutableRefObject, Ref, useEffect } from "react";
import CoreInputField from "../commons/core-input-field/core-input-field";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import { optimizationTabFocus } from "@/lib/optimizationKeyboard";
import useCurrentPwValidation from "@/hooks/change-password-modal/useCurrentPwValidation";

interface IProps {
  isModal?: boolean;
  closeBtnRef: MutableRefObject<HTMLButtonElement | null>;
}
const ChagePasswordCurrentPasswordField = forwardRef<
  HTMLInputElement | null,
  IProps
>(({ isModal, closeBtnRef }, ref) => {
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
        inputKeydown={
          isModal
            ? (e) =>
                optimizationTabFocus({
                  event: e,
                  previousTarget: closeBtnRef.current,
                })
            : undefined
        }
      />
    </div>
  );
});

ChagePasswordCurrentPasswordField.displayName = "ChangePasswordCurrentPwField";
export default ChagePasswordCurrentPasswordField;
