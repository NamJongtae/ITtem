import Spinner from "@/components/commons/spinner";
import useVerificationEmailStore from '@/store/verification-email-store';
import { MutableRefObject } from "react";

interface IProps {
  requestSendToVerificationEmail: () => void;
  resetSendToVerificationEmail: () => void;
  verificationCodeRef: MutableRefObject<HTMLInputElement | null>;
}

export default function SignupVerificationCodeBtns({
  requestSendToVerificationEmail,
  resetSendToVerificationEmail,
  verificationCodeRef
}: IProps) {
  const sendToVerificationEmailLoading = useVerificationEmailStore(
    (state) => state.sendToVerificationEmailLoading
  );

  return (
    <div className='text-sm text-center mt-2'>
      <p>
        인증코드가 오지 않았나요?{" "}
        <button
          onClick={() => {
            requestSendToVerificationEmail();
            if (!verificationCodeRef.current) return;
            verificationCodeRef.current.focus();
          }}
          className={`${
            !sendToVerificationEmailLoading && "underline"
          } text-gray-400  underline-offset-2`}
          type='button'
        >
          {sendToVerificationEmailLoading ? (
            <div className='flex items-center ml-1'>
              <Spinner className='w-[14px] h-[14px] mr-1' />
              전송중...
            </div>
          ) : (
            "재요청"
          )}
        </button>
      </p>
      <p>
        이메일을 잘못입력하셨나요?{" "}
        <button
          onClick={resetSendToVerificationEmail}
          className='text-gray-400 underline underline-offset-2 mt-1'
          type='button'
        >
          이메일 변경하기
        </button>
      </p>
    </div>
  );
}
