import useProfileImg from "@/hooks/signup/useProfileImg";
import ProfileImgInput from "./profileImg-input";
import ProfileImgInputBtn from "./profileImg-input-btn";
import { MutableRefObject, forwardRef } from "react";

interface IProps {
  profileImgBtnRef: MutableRefObject<HTMLButtonElement | null>;
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  nicknameRef: MutableRefObject<HTMLInputElement | null>;
  cancelBtnRef: MutableRefObject<HTMLButtonElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function ProfileImgField({
  profileImgBtnRef,
  profileImgResetBtnRef,
  nicknameRef,
  cancelBtnRef,
  submitBtnRef,
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
      <ProfileImgInputBtn
        handleClickImgInput={handleClickImgInput}
        resetProfileImg={resetProfileImg}
        preview={preview}
        profileImgBtnRef={profileImgBtnRef}
        profileImgResetBtnRef={profileImgResetBtnRef}
        nicknameRef={nicknameRef}
        cancelBtnRef={cancelBtnRef}
        submitBtnRef={submitBtnRef}
      />
      <ProfileImgInput
        handleChangeImg={handleChangeImg}
        imgInputRef={imgInputRef}
      />
    </div>
  );
}
