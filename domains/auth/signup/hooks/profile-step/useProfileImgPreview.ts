import { imgValidation } from "@/shared/common/utils/imgValidation";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

export function useProfileImgPreview() {
  const [preview, setPreview] = useState("/icons/user-icon.svg");
  const { setValue } = useFormContext();

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
    preview,
    handleChangeImg,
    resetProfileImg,
    setPreview // 수정 시 초기화용
  };
}
