import useSignupStore from "@/store/signup-store";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

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

  const isVerifiedEmail = useSignupStore((state) => state.isVerifiedEmail);
  const isDisabled = !!errors || !isDirty || !isVerifiedEmail;

  const router = useRouter();

  const handleCilckToback = () => {
    router.push("/signin");
  };

  return { isDisabled, handleCilckToback };
}
