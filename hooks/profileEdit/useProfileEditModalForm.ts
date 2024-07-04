import useMyProfileQuery from "../reactQuery/querys/profile/useMyProfileQuery";
import useProfileEditSubmit from "./useProfileEditSubmit";
import { useRef } from "react";

interface IPrarms {
  closeModal: () => void;
}

export default function useProfileEditModalForm({ closeModal }: IPrarms) {
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const introduceRef = useRef<HTMLTextAreaElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const profileImgBtnRef = useRef<HTMLButtonElement | null>(null);
  const profileImgResetBtnRef = useRef<HTMLButtonElement | null>(null);

  const { myProfileData } = useMyProfileQuery();
  const { handleProfileEditSubmit, profileEditLoading } =
    useProfileEditSubmit(closeModal);

  return {
    myProfileData,
    handleProfileEditSubmit,
    profileEditLoading,
    nicknameRef,
    introduceRef,
    closeBtnRef,
    submitBtnRef,
    profileImgBtnRef,
    profileImgResetBtnRef,
  };
}
