import useSetpProfileBts from "@/hooks/signup/useSetpProfileBts";
interface IProps {
  nextStepHandler: () => void;
}

export default function SetpProfileBtns({ nextStepHandler }: IProps) {
  const { handleBlurNickname, isDisabled } = useSetpProfileBts({
    nextStepHandler,
  });

  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-3">
      <button
        type="button"
        onClick={handleBlurNickname}
        className="button_primary disabled:opacity-50"
        disabled={isDisabled}
      >
        다음
      </button>
    </div>
  );
}
