import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export default function FindPasswordBtns() {
  const { formState } = useFormContext();
  const errors =
    formState.errors["email"] ||
    formState.errors["password"] ||
    formState.errors["password-check"] ||
    formState.errors["verifyCode"];
  const isDirty =
    formState.dirtyFields["email"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["password-check"] &&
    formState.dirtyFields["verifyCode"];

  const isVerifyEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );
  const isDisabled = !!errors || !isDirty || !isVerifyEmail;

  const router = useRouter();

  const handleCilckToback = () => {
    router.push("/signin");
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <button
        type="submit"
        className="button_primary w-full disabled:opacity-50"
        disabled={isDisabled}
      >
        비밀번호 변경하기
      </button>
      <button
        type="button"
        onClick={handleCilckToback}
        className="button_secondary w-full"
      >
        취소
      </button>
    </div>
  );
}
