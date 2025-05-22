import CoreInputField from "@/components/core-input-field/core-input-field";
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERRORMSG
} from "../../../constants/constansts";

export default function SignupPasswordField() {
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
          message: PASSWORD_REGEX_ERRORMSG
        }}
      />
    </div>
  );
}
