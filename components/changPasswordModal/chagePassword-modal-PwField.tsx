import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import CoreInputField from "../commons/coreInputField/core-input-field";
import { useFormContext } from "react-hook-form";

export default function ChagePasswordModalPwField() {
  const { watch } = useFormContext();
  const currentPasswordValue = watch("current-password");

  return (
    <div>
      <CoreInputField
        label="비밀번호"
        inputId="password"
        inputName="password"
        inputType="password"
        inputPlaceholder="비밀번호를 입력하세요."
        inputMinLength={8}
        inputMaxLength={16}
        inputRequired={"비밀번호를 입력하세요."}
        inputPattern={{
          value: PASSWORD_REGEX,
          message: PASSWORD_REGEX_ERRORMSG,
        }}
        inputValidate={(value) =>
          currentPasswordValue === value
            ? "현재 비밀번호와 변경할 비밀번호가 같습니다."
            : true
        }
        labelHidden={false}
        labelClassName="font-semibold"
        inputClassName={"border-b pb-3 w-full text-sm mt-4 focus:outline-none"}
      />
    </div>
  );
}
