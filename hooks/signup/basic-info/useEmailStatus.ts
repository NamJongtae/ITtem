import useVerificationEmailStore from '@/store/verification-email-store';
import { useFormContext } from "react-hook-form";

export default function useEmailStatus() {
  const { formState } = useFormContext();
  const isSendToVerifyEmail = useVerificationEmailStore(
    (state) => state.isSendToVerifyEmail
  );
  const isVerifiedEmail = useVerificationEmailStore((state) => state.isVerifiedEmail);
  const isDirty = formState.dirtyFields["email"];
  const errors = formState.errors["email"];

  return {
    isSendToVerifyEmail,
    isVerifiedEmail,
    errors,
    isDirty
  };
}
