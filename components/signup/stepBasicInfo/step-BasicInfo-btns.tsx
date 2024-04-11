import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

interface IProps {
  nextStepHandler: () => void;
}

export default function StepBasicInfoBtns({ nextStepHandler }: IProps) {
  const { formState } = useFormContext();
  const errors =
    formState.errors["email"] ||
    formState.errors["password"] ||
    formState.errors["verifyCode"];
  const isDirty =
    formState.dirtyFields["email"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["verifyCode"];

  const isDisabled = !!errors || !isDirty;

  const router = useRouter();

  const handleCilckToback = () => {
    router.push("/");
  };

  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-10">
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
        onClick={handleCilckToback}
        className="button_secondary w-full"
      >
        다음에 가입하기
      </button>
    </div>
  );
}
