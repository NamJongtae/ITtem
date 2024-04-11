import { MutableRefObject } from "react";
import VerifyCodeInput from "./verifyCode-input";
import VerifyCodeBtns from "./verifyCode-btns";
import VerifyBtn from "./verify-Btn";

interface IProps {
  counter: number;
  handleClickVerifyEmail: () => void;
  verifyCodeRef: MutableRefObject<HTMLInputElement | null>;
  requestSendToVerifyEmail: () => void;
  resetSendToVerifyEmail: () => void;
  SendToVerifyEmailLoading: boolean;
}
export default function VerifyCodeField({
  counter,
  handleClickVerifyEmail,
  verifyCodeRef,
  requestSendToVerifyEmail,
  resetSendToVerifyEmail,
  SendToVerifyEmailLoading,
}: IProps) {
  return (
    <div>
      <div className="flex gap-2 items-center mt-3">
        <label className="sr-only" htmlFor="verifyCode">
          인증코드
        </label>

        <VerifyCodeInput counter={counter} verifyCodeRef={verifyCodeRef} />

        <VerifyBtn handleClickVerifyEmail={handleClickVerifyEmail} />
      </div>

      <VerifyCodeBtns
        requestSendToVerifyEmail={requestSendToVerifyEmail}
        resetSendToVerifyEmail={resetSendToVerifyEmail}
        SendToVerifyEmailLoading={SendToVerifyEmailLoading}
        verifyCodeRef={verifyCodeRef}
      />
    </div>
  );
}
