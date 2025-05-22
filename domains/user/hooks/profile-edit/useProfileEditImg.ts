import { imgValidation } from "@/utils/imgValidation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function useProfileEditImg() {
  const [preview, setPreview] = useState("/icons/user-icon.svg");
  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const { setValue, getValues } = useFormContext();
  const img = getValues("profileImg");

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

  // 프로필 수정시 초기 이미지 설정
  useEffect(() => {
    setPreview(img);
  }, []);

  return {
    handleClickImgInput,
    resetProfileImg,
    preview,
    handleChangeImg,
    imgInputRef
  };
}
