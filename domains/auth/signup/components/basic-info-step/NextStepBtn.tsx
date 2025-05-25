import useBasicInfoNextBtnDisabled from "../../hooks/basic-info-step/useBasicInfoNextBtnDisabled";
interface IProps {
  nextStepHandler: () => void;
}

export default function NextStepBtn({ nextStepHandler }: IProps) {
  const { isDisabled } = useBasicInfoNextBtnDisabled();

  return (
    <button
      type="button"
      onClick={nextStepHandler}
      className="button_primary w-full disabled:opacity-50"
      disabled={isDisabled}
    >
      다음
    </button>
  );
}
