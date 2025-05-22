import useProfileEditImg from "../../hooks/profile-edit/useProfileEditImg";
import ImgInputBtn from "./profile-edit-Img-input-btn";
import ProfileEditImgInput from "./profile-edit-img-input";
import { RefObject } from "react";

interface IProps {
  isModal?: boolean;
  profileImgBtnRef: RefObject<HTMLButtonElement | null>;
  profileImgResetBtnRef: RefObject<HTMLButtonElement | null>;
  nicknameRef: RefObject<HTMLInputElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
}

export default function ProfileEditImgField({
  isModal,
  profileImgBtnRef,
  profileImgResetBtnRef,
  nicknameRef,
  closeBtnRef
}: IProps) {
  const {
    handleClickImgInput,
    resetProfileImg,
    preview,
    handleChangeImg,
    imgInputRef
  } = useProfileEditImg();

  return (
    <div className="flex items-center justify-center">
      <ImgInputBtn
        isModal={isModal}
        handleClickImgInput={handleClickImgInput}
        resetProfileImg={resetProfileImg}
        preview={preview}
        profileImgBtnRef={profileImgBtnRef}
        profileImgResetBtnRef={profileImgResetBtnRef}
        nicknameRef={nicknameRef}
        closeBtnRef={closeBtnRef}
      />
      <ProfileEditImgInput
        handleChangeImg={handleChangeImg}
        imgInputRef={imgInputRef}
      />
    </div>
  );
}
