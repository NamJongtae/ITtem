import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import { useFormContext } from "react-hook-form";
import CoreInputField from "../commons/coreInputField/core-input-field";

export default function SigninPasswordField() {
  const { register, formState } = useFormContext();
  const error = formState.errors["password"];

  return (
    <div className="mb-5">
      <CoreInputField
        label="password"
        inputId="password"
        inputName="password"
        inputType="password"
        inputRequired="비밀번호를 입력해주세요."
        inputPlaceholder="비밀번호를 입력해주세요."
        inputPattern={{
          value: PASSWORD_REGEX,
          message: PASSWORD_REGEX_ERRORMSG,
        }}
      />
    </div>
  );
}
