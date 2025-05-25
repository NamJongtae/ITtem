import ImgInput from "./ImgInput";
import ImgInputBtn from "./ImgInputBtn";
import { useProfileImgPreview } from "../../hooks/profile-step/useProfileImgPreview";
import { useImgInputTrigger } from "../../hooks/profile-step/useImgInputTrigger";

export default function ImgField() {
  const { handleChangeImg, resetProfileImg, preview } = useProfileImgPreview();
  const { handleClickImgInput, imgInputRef } = useImgInputTrigger();

  return (
    <div className="flex items-center justify-center">
      <ImgInputBtn
        handleClickImgInput={handleClickImgInput}
        resetProfileImg={resetProfileImg}
        preview={preview}
      />
      <ImgInput handleChangeImg={handleChangeImg} imgInputRef={imgInputRef} />
    </div>
  );
}
