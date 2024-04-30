import { useEffect } from "react";
import useChangePasswordMutate from "../querys/useChangePasswordMutate";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/router";

export default function useChangePassword() {
  const router = useRouter();

  const {
    changePasswordMutate,
    changePasswordLoading,
    changePasswordSuccess,
    changePasswordError,
  } = useChangePasswordMutate();

  const handleSubmit = (data: FieldValues) => {
    changePasswordMutate({
      email: data.email,
      password: data.password,
      isFindPw: true,
    });
  };

  useEffect(() => {
    if (changePasswordSuccess) {
      if (changePasswordSuccess) {
        router.push("/signin");
        toast.success("비밀번호가 변경되었습니다.");
      }
    }
  }, [changePasswordSuccess, router]);

  useEffect(() => {
    if (changePasswordError) {
      if (isAxiosError<{ message: string }>(changePasswordError)) {
        toast.warn(changePasswordError.response?.data.message);
      }
    }
  }, [changePasswordError]);

  return { handleSubmit, changePasswordLoading };
}
