import { RootState } from '@/store/store';
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useSelector } from 'react-redux';

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

    const isVerifyEmail = useSelector(
      (state: RootState) => state.signup.isVerifedEmail
    );
    const isDisabled = !!errors || !isDirty || !isVerifyEmail;

  const router = useRouter();

  const handleCilckToback = () => {
    router.push("/");
  };

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
        onClick={handleCilckToback}
        className="button_secondary w-full"
      >
        다음에 가입하기
      </button>
    </div>
  );
}
