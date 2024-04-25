import { PASSWORD_REGEX, PASSWORD_REGEX_ERRORMSG } from "@/constants/constant";
import CoreInputField from "../commons/coreInputField/core-input-field";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function PasswordField() {
  const isVerifyEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );
  
  return (
    isVerifyEmail && (
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
        />
      </div>
    )
  );
}
