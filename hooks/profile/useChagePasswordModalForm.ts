import { useRef } from "react";
import useChangePasswordMutate from "../reactQuery/mutations/auth/useChangePasswordMutate";
import { useFocusing } from "../commons/useFocusing";

interface IParams {
  closeModal: () => void;
}

export default function useChagePasswordModalForm({ closeModal }: IParams) {
  const currentPwRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);
  const pwCheckRef = useRef<HTMLInputElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const { changePasswordMutate, changePasswordLoading } =
    useChangePasswordMutate({ closeModal });

  useFocusing(currentPwRef);

  return {
    changePasswordLoading,
    changePasswordMutate,
    currentPwRef,
    pwRef,
    pwCheckRef,
    closeBtnRef,
    submitBtnRef,
  };
}
