import { EMAIL_REGEX, EMAIL_REGEX_ERRORMSG } from "@/constants/constant";
import CoreInputField from '../commons/coreInputField/core-input-field';

export default function SigninEmailField() {
  return (
    <div className="mb-2">
      <CoreInputField
        label="email"
        inputId="email"
        inputName="email"
        inputType="text"
        inputPattern={{
          value: EMAIL_REGEX,
          message: EMAIL_REGEX_ERRORMSG,
        }}
        inputRequired={"이메일을 입력해주세요."}
        inputPlaceholder={"이메일을 입력해주세요."}
      />
    </div>
  );
}
