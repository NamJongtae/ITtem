import useModal from "@/hooks/commons/useModal";
import React from "react";
import ProfileEditModal from "../profileEditModal/profileEdit-modal";

export default function ProfileUserInfoCardEditProfileBtn() {
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
      >
        프로필 수정
      </button>
      {isOpenModal && (
        <ProfileEditModal handleClickCloseBtn={handleClickCloseBtn} />
      )}
    </>
  );
}
