import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERRORMSG
} from "../../shared/common/constants/constansts";
import CoreInputField from "@/shared/core-input-field/components/CoreInputField";

export default function PasswordField() {
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
          message: PASSWORD_REGEX_ERRORMSG
        }}
      />
    </div>
  );
}
