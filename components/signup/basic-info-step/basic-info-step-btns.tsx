import useBasicInfoNextBtnDisabled from '@/hooks/signup/basic-info/useBasicInfoNextBtnDisabled';
import useSignupCancelHandler from "@/hooks/signup/basic-info/useSignupCancelHandler";

interface IProps {
  nextStepHandler: () => void;
}

export default function StepBtns({ nextStepHandler }: IProps) {
  const { isDisabled } = useBasicInfoNextBtnDisabled();
  const { cancelSignup } = useSignupCancelHandler();

  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-3">
      <button
        type="button"
        onClick={nextStepHandler}
        className="button_primary w-full disabled:opacity-50"
        disabled={isDisabled}
      >
        다음
      </button>
      <button
        type="button"
        onClick={cancelSignup}
        className="button_secondary w-full"
      >
        다음에 가입하기
      </button>
    </div>
  );
}
