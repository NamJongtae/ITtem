import useProfileImg from "@/hooks/signup/useProfileImg";
import ProfileImgInput from "@/components/signup/stepProfile/profileImg-input";
import { MutableRefObject, forwardRef } from "react";
import ProfileEditImgInputBtn from "./profileEdit-Img-input-btn";

interface IProps {
  profileImgBtnRef: MutableRefObject<HTMLButtonElement | null>;
  profileImgResetBtnRef: MutableRefObject<HTMLButtonElement | null>;
  nicknameRef: MutableRefObject<HTMLInputElement | null>;
  cancelBtnRef: MutableRefObject<HTMLButtonElement | null>;
  submitBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function ProfileEditImgField({
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
      <ProfileEditImgInputBtn
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
