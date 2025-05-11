import { useFormContext } from "react-hook-form";
import useEmailStatus from "../signup/basic-info/useEmailStatus";

export default function useFindPasswordBtnDisabled() {
  const { formState } = useFormContext();
  const errors =
    formState.errors["email"] ||
    formState.errors["password"] ||
    formState.errors["password-check"] ||
    formState.errors["verificationCode"];
  const isDirty =
    formState.dirtyFields["email"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["password-check"] &&
    formState.dirtyFields["verificationCode"];

  const { isVerifiedEmail } = useEmailStatus();
  const isDisabled = !!errors || !isDirty || !isVerifiedEmail;

  return { isDisabled };
}
