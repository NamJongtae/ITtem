import useProfileEditImg from "../hooks/useProfileEditImg";
import ImgInputBtn from "./ImgInputBtn";
import ImgInput from "./ImgInput";
import { RefObject } from "react";

interface IProps {
  isModal?: boolean;
  profileImgBtnRef: RefObject<HTMLButtonElement | null>;
  profileImgResetBtnRef: RefObject<HTMLButtonElement | null>;
  nicknameRef: RefObject<HTMLInputElement | null>;
  closeBtnRef: RefObject<HTMLButtonElement | null>;
}

export default function ImgField({
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
      <ImgInput handleChangeImg={handleChangeImg} imgInputRef={imgInputRef} />
    </div>
  );
}
