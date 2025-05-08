import Spinner from "@/components/commons/spinner";
import useVerificationEmailStore from '@/store/verification-email-store';
import { MutableRefObject } from "react";

interface IProps {
  requestSendToVerifyEmail: () => void;
  resetSendToVerifyEmail: () => void;
  verifyCodeRef: MutableRefObject<HTMLInputElement | null>;
}

export default function SignupVerifyCodeBtns({
  requestSendToVerifyEmail,
  resetSendToVerifyEmail,
  verifyCodeRef
}: IProps) {
  const sendToVerifyEmailLoading = useVerificationEmailStore(
    (state) => state.sendToVerifyEmailLoading
  );

  return (
    <div className='text-sm text-center mt-2'>
      <p>
        인증코드가 오지 않았나요?{" "}
        <button
          onClick={() => {
            requestSendToVerifyEmail();
            if (!verifyCodeRef.current) return;
            verifyCodeRef.current.focus();
          }}
          className={`${
            !sendToVerifyEmailLoading && "underline"
          } text-gray-400  underline-offset-2`}
          type='button'
        >
          {sendToVerifyEmailLoading ? (
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
          onClick={resetSendToVerifyEmail}
          className='text-gray-400 underline underline-offset-2 mt-1'
          type='button'
        >
          이메일 변경하기
        </button>
      </p>
    </div>
  );
}
