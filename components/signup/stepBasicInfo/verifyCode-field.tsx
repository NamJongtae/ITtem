import VerifyCodeInput from "./verifyCode-input";
import VerifyCodeBtns from "./verifyCode-btns";
import VerifyBtn from "./emailVerify-Btn";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function VerifyCodeField() {
  const {
    handleClickVerifyEmail,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verifyCodeRef,
  } = useVerifyEmail();

  const isSendToVerifyEmail = useSelector(
    (state: RootState) => state.signup.isSendToVerifyEmail
  );
  const isVerifiedEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );
  
  return (
    isSendToVerifyEmail &&
    !isVerifiedEmail && (
      <div>
        <div className="flex gap-2 items-center mt-3">
          <label className="sr-only" htmlFor="verifyCode">
            인증코드
          </label>

          <VerifyCodeInput verifyCodeRef={verifyCodeRef} />

          <VerifyBtn handleClickVerifyEmail={handleClickVerifyEmail} />
        </div>

        <VerifyCodeBtns
          requestSendToVerifyEmail={requestSendToVerifyEmail}
          resetSendToVerifyEmail={resetSendToVerifyEmail}
          verifyCodeRef={verifyCodeRef}
        />
      </div>
    )
  );
}
