import Spinner from '@/components/commons/spinner';

interface IProps {
  requestSendToVerifyEmail: () => void;
  resetSendToVerifyEmail: () => void;
  SendToVerifyEmailLoading: boolean;
}

export default function VerifyCodeBtns({
  requestSendToVerifyEmail,
  resetSendToVerifyEmail,
  SendToVerifyEmailLoading,
}: IProps) {
  return (
    <div className="text-sm text-center mt-2">
      <p>
        인증코드가 오지 않았나요?{" "}
        <button
          onClick={requestSendToVerifyEmail}
          className={`${
            !SendToVerifyEmailLoading && "underline"
          } text-gray-400  underline-offset-2`}
          type="button"
        >
          {SendToVerifyEmailLoading ? (
            <div className="flex items-center ml-1">
              <Spinner className="w-[14px] h-[14px] mr-1" />
              전송중...
            </div>
          ) : (
            "재전송"
          )}
        </button>
      </p>
      <p>
        이메일을 잘못입력하셨나요?{" "}
        <button
          onClick={resetSendToVerifyEmail}
          className="text-gray-400 underline underline-offset-2 mt-1"
          type="button"
        >
          이메일 변경하기
        </button>
      </p>
    </div>
  );
}
