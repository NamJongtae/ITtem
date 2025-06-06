import { useRef } from "react";
import useRouterBackToCloseModal from "@/shared/common/hooks/useRouterBackToCloseModal";
import useChangePasswordMutate from "@/domains/auth/change-password/hooks/useChangePasswordMutate";
import useBodyOverflow from "@/shared/common/hooks/useBodyOverflow";

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
