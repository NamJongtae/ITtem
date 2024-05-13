import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import CoreInputField from "../commons/coreInputField/core-input-field";

export default function ChagePasswordModalPwField() {
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
        labelHidden={false}
        labelClassName="font-semibold"
        inputClassName={"border-b pb-3 w-full text-sm mt-4 focus:outline-none"}
      />
    </div>
  );
}
