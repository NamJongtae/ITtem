import useProfileImg from "@/hooks/signup/useProfileImg";
import SingupProfileImgInput from "./sigup-profile-img-input";
import SingupProfileImgInputBtn from "./sigup-profile-img-input-btn";

export default function SignupProfileImgField() {
  const {
    handleClickImgInput,
    resetProfileImg,
    preview,
    handleChangeImg,
    imgInputRef,
  } = useProfileImg();

  return (
    <div className="flex items-center justify-center">
      <SingupProfileImgInputBtn
        handleClickImgInput={handleClickImgInput}
        resetProfileImg={resetProfileImg}
        preview={preview}
      />
      <SingupProfileImgInput
        handleChangeImg={handleChangeImg}
        imgInputRef={imgInputRef}
      />
    </div>
  );
}
