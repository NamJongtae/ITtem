import CoreInputField from "@/components/commons/core-input-field/core-input-field";
import { NICKNAME_REGEX, NICKNAME_REGEX_ERRORMSG } from "@/constants/constant";

export default function SignupNicknameField() {
  return (
    <div>
      <CoreInputField
        label="닉네임"
        inputId="nickname"
        inputName="nickname"
        inputType="text"
        inputMinLength={4}
        inputMaxLength={8}
        inputPlaceholder="닉네임을 입력해주세요."
        inputRequired="닉네임을 입력해주세요."
        inputPattern={{
          value: NICKNAME_REGEX,
          message: NICKNAME_REGEX_ERRORMSG,
        }}
      />
    </div>
  );
}
