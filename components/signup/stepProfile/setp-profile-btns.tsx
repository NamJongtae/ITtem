import { useFormContext } from "react-hook-form";

interface IProps {
  nextStepHandler: () => void;
}

export default function SetpProfileBtns({
  nextStepHandler,
}: IProps) {
  const { formState } = useFormContext();
  const isDirty = formState.dirtyFields["nickname"];
  const errors = formState.errors["nickname"];
  const isDisabled = !!errors || !isDirty;

  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-10">
      <button
        type="button"
        onClick={nextStepHandler}
        className="button_primary disabled:opacity-50"
        disabled={isDisabled}
      >
        다음
      </button>
    </div>
  );
}
