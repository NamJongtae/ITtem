import { useFormContext } from "react-hook-form";
import useEmailStatus from "./useEmailStatus";

export default function useBasicInfoNextBtnDisabled() {
  const { formState } = useFormContext();
  const errors =
    formState.errors["email"] ||
    formState.errors["password"] ||
    formState.errors["verificationCode"];
  const isDirty =
    formState.dirtyFields["email"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["verificationCode"];

  const { isVerifiedEmail } = useEmailStatus();

  const isDisabled = !!errors || !isDirty || !isVerifiedEmail;

  return { isDisabled };
}
