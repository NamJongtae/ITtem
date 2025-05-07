import useCheckNicknameDuplication from "@/hooks/signup/profile/useCheckNicknameDuplication";
import useProfileNextBtnDisabled from "@/hooks/signup/profile/useProfileNextBtnDisabled";
interface IProps {
  nextStepHandler: () => void;
}

export default function SignupProfileSettingSetpBtns({
  nextStepHandler
}: IProps) {
  const { checkNicknameDuplication } = useCheckNicknameDuplication({nextStepHandler});
  const { isDisabled } = useProfileNextBtnDisabled();

  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-3">
      <button
        type="button"
        onClick={checkNicknameDuplication}
        className="button_primary disabled:opacity-50"
        disabled={isDisabled}
      >
        다음
      </button>
    </div>
  );
}
