import { ERROR_MESSAGE } from "@/shared/common/constants/constant";
import checkEmail from "../../api/checkEmail";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export default function useCheckEmailMutate() {
  const { setError } = useFormContext();
  const { mutateAsync: checkEmailMutate } = useMutation({
    mutationFn: async (email: string) => await checkEmail(email),
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        if (error.response?.status === 401) {
          setError("email", {
            type: "checkEmail",
            message: error.response.data.message
          });
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    }
  });
  return { checkEmailMutate };
}
