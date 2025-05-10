import { useRef } from "react";
import useRouterBackToCloseModal from "../commons/useRouterBackToCloseModal";
import useChangePasswordMutate from "../react-query/mutations/auth/useChangePasswordMutate";
import useBodyOverflow from "../commons/useBodyOverflow";

interface IParams {
  isModal?: boolean;
}

export default function useChangePwFormLogic({ isModal }: IParams) {
  const currentPwRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);
  const pwCheckRef = useRef<HTMLInputElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const { closeModalHandler } = useRouterBackToCloseModal();
  const { changePasswordLoading, changePasswordMutate } =
    useChangePasswordMutate({ closeModal: closeModalHandler });

  useBodyOverflow({ isLocked: isModal });

  return {
    currentPwRef,
    pwRef,
    pwCheckRef,
    closeBtnRef,
    submitBtnRef,
    closeModalHandler,
    changePasswordLoading,
    changePasswordMutate
  };
}
