import EmailVerificationError from "./EmailVerificationError";
import SendVerificationCodeBtn from "./SendVerificationCodeBtn";
import CoreInputField from "@/shared/core-input-field/components/CoreInputField";
import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERRORMSG
} from "../../common/constants/constansts";
import useEmailVerificationStatus from "../hooks/useEmailVerificationStatus";
import { useFocusEmailVerificationInput } from "../hooks/useFocusEmailVerificationInput";
import { EmailVerificationType } from "../types/emailVerificationTypes";

interface IProps {
  emailVerificationType: EmailVerificationType;
}

export default function EmailVerificationField({
  emailVerificationType
}: IProps) {
  const { isSendToVerificationEmail } = useEmailVerificationStatus();
  const { emailRef } = useFocusEmailVerificationInput();

  return (
    <div>
      <div className="flex gap-3 items-center">
        <CoreInputField
          label="이메일"
          inputId="email"
          inputName="email"
          inputType="email"
          inputPlaceholder="이메일을 입력해주세요."
          inputRequired="이메일을 입력해주세요."
          inputReadOnly={isSendToVerificationEmail}
          inputPattern={{
            value: EMAIL_REGEX,
            message: EMAIL_REGEX_ERRORMSG
          }}
          hideError={true}
          inputRef={emailRef}
        />

        {!isSendToVerificationEmail && (
          <SendVerificationCodeBtn
            emailVerificationType={emailVerificationType}
          />
        )}
      </div>

      <EmailVerificationError />
    </div>
  );
}
