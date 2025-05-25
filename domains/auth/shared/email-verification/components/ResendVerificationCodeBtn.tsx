import Spinner from "@/shared/common/components/Spinner";
import useResendEmailVerificationHandler from "../hooks/useResendEmailVerificationHandler";
import { EmailVerificationContext } from "../context/EmailVerificationProvider";
import { EmailVerificationType } from "../types/emailVerificationTypes";
import { RefObject, useContext } from "react";

interface IProps {
  verificationCodeRef: RefObject<HTMLInputElement | null>;
  emailVerificationType: EmailVerificationType;
}

export default function ResendVerificationCodeBtn({
  verificationCodeRef,
  emailVerificationType
}: IProps) {
  const { isLoading } = useContext(EmailVerificationContext);
  const { requestSendToVerificationEmail } = useResendEmailVerificationHandler(
    emailVerificationType
  );

  return (
    <p>
      인증코드가 오지 않았나요?{" "}
      <button
        onClick={() => {
          requestSendToVerificationEmail();
          if (!verificationCodeRef.current) return;
          verificationCodeRef.current.focus();
        }}
        className={`${
          !isLoading && "underline"
        } text-gray-400  underline-offset-2`}
        type="button"
      >
        {isLoading ? (
          <div className="flex items-center ml-1">
            <Spinner className="w-[14px] h-[14px] mr-1" />
            전송중...
          </div>
        ) : (
          "재요청"
        )}
      </button>
    </p>
  );
}
