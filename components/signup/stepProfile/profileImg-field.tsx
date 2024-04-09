import useProfileImg from "@/hooks/useProfileImg";
import ProfileImgInput from "./profileImg-input";
import ProfileImgInputBtn from "./profileImg-input-btn";

export default function ProfileImgField() {
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
      />
      <ProfileImgInput
        handleChangeImg={handleChangeImg}
        imgInputRef={imgInputRef}
      />
    </div>
  );
}
