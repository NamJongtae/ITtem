import useSignupStore from "@/store/signup-store";
import { useFormContext } from "react-hook-form";

export default function useEmailStatus() {
  const { formState } = useFormContext();
  const isSendToVerifyEmail = useSignupStore(
    (state) => state.isSendToVerifyEmail
  );
  const isVerifiedEmail = useSignupStore((state) => state.isVerifiedEmail);
  const isDirty = formState.dirtyFields["email"];
  const errors = formState.errors["email"];

  return {
    isSendToVerifyEmail,
    isVerifiedEmail,
    errors,
    isDirty
  };
}
