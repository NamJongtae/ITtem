import { verifyEmail } from "@/lib/api/signup";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function useVerifyEmailMutate(sucessVeriedEmail: () => void) {
  const { clearErrors } = useFormContext();
  const { mutate: verifyEmailMuate } = useMutation({
    mutationFn: ({
      email,
      verifyNumber,
    }: {
      email: string;
      verifyNumber: number;
    }) => verifyEmail(email, verifyNumber),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      sucessVeriedEmail();
      clearErrors("verfiyNumber");
    },
    onError: (error: unknown) => {
      if (isAxiosError<EmailVerifyData, any>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { verifyEmailMuate };
}
