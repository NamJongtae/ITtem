import SingupProfileImgInput from "./sigup-profile-img-input";
import SingupProfileImgInputBtn from "./sigup-profile-img-input-btn";
import { useProfileImgPreview } from '../../../hooks/signup/profile-step/useProfileImgPreview';
import { useImgInputTrigger } from '../../../hooks/signup/profile-step/useImgInputTrigger';

export default function SignupProfileImgField() {
  const { handleChangeImg, resetProfileImg, preview } = useProfileImgPreview();
  const { handleClickImgInput, imgInputRef } = useImgInputTrigger();

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
