import useMyProfileQuery from "../../profile/hooks/queries/useMyProfileQuery";
import useProfileEditSubmit from "./useProfileEditSubmit";
import { useRef } from "react";
import useBodyOverflow from "@/shared/common/hooks/useBodyOverflow";
import useRouterBackToCloseModal from "@/shared/common/hooks/useRouterBackToCloseModal";

interface IPrarms {
  isModal?: boolean;
}

export default function useProfileEditFormLogic({ isModal }: IPrarms) {
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const introduceRef = useRef<HTMLTextAreaElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const profileImgBtnRef = useRef<HTMLButtonElement | null>(null);
  const profileImgResetBtnRef = useRef<HTMLButtonElement | null>(null);

  const { closeModalHandler } = useRouterBackToCloseModal();

  const { myProfileData, myProfilePending } = useMyProfileQuery();
  const { onSubmit, profileEditLoading } =
    useProfileEditSubmit(closeModalHandler);

  useBodyOverflow({ isLocked: isModal });

  return {
    myProfileData,
    myProfilePending,
    onSubmit,
    profileEditLoading,
    nicknameRef,
    introduceRef,
    closeBtnRef,
    submitBtnRef,
    profileImgBtnRef,
    profileImgResetBtnRef,
    closeModalHandler
  };
}
