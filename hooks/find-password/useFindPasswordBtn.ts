import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export default function useFindPasswordBtn() {
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

  return { isDisabled, handleCilckToback };
}
