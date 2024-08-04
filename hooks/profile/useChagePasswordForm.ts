import { useEffect, useRef } from "react";
import useChangePasswordMutate from "../react-query/mutations/auth/useChangePasswordMutate";
import { useFocusing } from "../commons/useFocusing";
import { useRouter } from "next/navigation";

interface IParams {
  isModal?: boolean;
}

export default function useChagePasswordForm({ isModal }: IParams) {
  const currentPwRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);
  const pwCheckRef = useRef<HTMLInputElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();
  const handleClickClose = () => {
    router.back();
  };

  const { changePasswordMutate, changePasswordLoading } =
    useChangePasswordMutate({ closeModal: handleClickClose });

  useFocusing(currentPwRef);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModal]);

  return {
    changePasswordLoading,
    changePasswordMutate,
    currentPwRef,
    pwRef,
    pwCheckRef,
    closeBtnRef,
    submitBtnRef,
    handleClickClose,
  };
}
