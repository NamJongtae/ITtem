import { imgValidation } from "@/shared/common/utils/imgValidation";
import { useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function useProfileImg() {
  const [preview, setPreview] = useState("/icons/user-icon.svg");
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const { setValue } = useFormContext();

  const handleClickImgInput = useCallback(() => {
    if (!imgInputRef.current) return;
    imgInputRef.current.click();
  }, []);

  const handleChangeImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];

      const isValid = imgValidation(file);
      if (!isValid) return;

      const imgPreview = URL.createObjectURL(file);
      setValue("profileImg", file, { shouldDirty: true, shouldValidate: true });
      setPreview(imgPreview);
    },
    []
  );

  const resetProfileImg = useCallback(() => {
    setValue("profileImg", "", { shouldDirty: true, shouldValidate: true });
    setPreview("/icons/user-icon.svg");
  }, []);


  return {
    handleClickImgInput,
    resetProfileImg,
    preview,
    handleChangeImg,
    imgInputRef
  };
}
