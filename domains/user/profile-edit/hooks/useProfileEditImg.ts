import { imgValidation } from "@/shared/common/utils/imgValidation";
import { useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const DEFAULT_PREVIEW = "/icons/user-icon.svg";

export default function useProfileEditImg() {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const { setValue, getValues } = useFormContext();

  const [preview, setPreview] = useState<string>(() => {
    const img = getValues("profileImg");
    return (img as string) || DEFAULT_PREVIEW;
  });

  const handleClickImgInput = useCallback(() => {
    imgInputRef.current?.click();
  }, []);

  const handleChangeImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!imgValidation(file)) return;

      const imgPreview = URL.createObjectURL(file);

      setValue("profileImg", file, { shouldDirty: true, shouldValidate: true });

      setPreview((prev) => {
        if (prev.startsWith("blob:")) URL.revokeObjectURL(prev);
        return imgPreview;
      });
    },
    [setValue]
  );

  const resetProfileImg = useCallback(() => {
    setValue("profileImg", "", { shouldDirty: true, shouldValidate: true });

    setPreview((prev) => {
      if (prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return DEFAULT_PREVIEW;
    });
  }, [setValue]);

  return {
    handleClickImgInput,
    resetProfileImg,
    preview,
    handleChangeImg,
    imgInputRef
  };
}
