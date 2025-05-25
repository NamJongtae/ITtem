import CoreInputField from "@/shared/core-input-field/components/CoreInputField";
import {
  NICKNAME_REGEX,
  NICKNAME_REGEX_ERRORMSG
} from "../../../shared/common/constants/constansts";

export default function NicknameField() {
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
          message: NICKNAME_REGEX_ERRORMSG
        }}
      />
    </div>
  );
}
