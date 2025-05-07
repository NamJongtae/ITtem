import useProfileImg from "@/hooks/signup/profile/useProfileImg";
import ProfileImgInput from "@/components/signup/profile-setting-step/sigup-profile-img-input";
import { MutableRefObject } from "react";
import ImgInputBtn from "./profile-edit-Img-input-btn";

interface IProps {
  isModal?: boolean;
  profileImgBtnRef: MutableRefObject<HTMLButtonElement | null>;
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  nicknameRef: MutableRefObject<HTMLInputElement | null>;
  closeBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function ProfileEditImgField({
  isModal,
  profileImgBtnRef,
  profileImgResetBtnRef,
  nicknameRef,
  closeBtnRef,
}: IProps) {
  const {
    handleClickImgInput,
    resetProfileImg,
    preview,
    handleChangeImg,
    imgInputRef,
  } = useProfileImg();

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
      <ProfileImgInput
        handleChangeImg={handleChangeImg}
        imgInputRef={imgInputRef}
      />
    </div>
  );
}
