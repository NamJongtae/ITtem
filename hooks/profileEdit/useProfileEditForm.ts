import { useRouter } from 'next/navigation';
import useMyProfileQuery from "../reactQuery/queries/profile/useMyProfileQuery";
import useProfileEditSubmit from "./useProfileEditSubmit";
import { useEffect, useRef } from "react";

interface IPrarms {
  isModal?: boolean;
}

export default function useProfileEditForm({ isModal }: IPrarms) {
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const introduceRef = useRef<HTMLTextAreaElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const profileImgBtnRef = useRef<HTMLButtonElement | null>(null);
  const profileImgResetBtnRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();
  const handleClickClose = () => {
    router.back();
  }

  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();
  const { handleProfileEditSubmit, profileEditLoading } =
    useProfileEditSubmit(handleClickClose);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModal]);

  return {
    myProfileData,
    loadMyProfileLoading,
    handleProfileEditSubmit,
    profileEditLoading,
    nicknameRef,
    introduceRef,
    closeBtnRef,
    submitBtnRef,
    profileImgBtnRef,
    profileImgResetBtnRef,
    handleClickClose
  };
}
