import useSignupStore from '@/store/signup-store';
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

export default function useBasicInfoStepBtns() {
  const { formState } = useFormContext();
  const errors =
    formState.errors["email"] ||
    formState.errors["password"] ||
    formState.errors["verifyCode"];
  const isDirty =
    formState.dirtyFields["email"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["verifyCode"];

  const isVerifiedEmail = useSignupStore(
    (state) => state.isVerifiedEmail
  );
  const isDisabled = !!errors || !isDirty || !isVerifiedEmail;

  const router = useRouter();

  const handleCilckToback = () => {
    router.push("/");
  };

  return { isDisabled, handleCilckToback };
}
