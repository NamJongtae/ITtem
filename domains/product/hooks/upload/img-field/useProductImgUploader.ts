import { imgValidation } from "@/utils/imgValidation";
import { ProductImgData } from "../../../types/product-types";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export function useProductImgUploader(
  preview: ProductImgData[],
  addPreview: (string: ProductImgData[]) => void
) {
  const { getValues, setValue } = useFormContext();

  const validateAndPreview = (file: File) => {
    const isValid = imgValidation(file);
    const isUploaded = preview.some((item) => item.name === file.name);
    if (!isValid) return;
    if (isUploaded) {
      toast.warn(`${file.name}은(는) 이미 업로드된 이미지입니다.`);
      return;
    }
    return { url: URL.createObjectURL(file), name: file.name };
  };

  const uploadFiles = (files: FileList) => {
    const currentImgList = getValues("imgData") || [];
    const maxUpload = 5 - preview.length;

    if (files.length > maxUpload) {
      toast.warn("최대 5개의 이미지까지 업로드 가능합니다.");
      return;
    }

    const newPreviews = Array.from(files)
      .map(validateAndPreview)
      .filter((preview) => preview !== undefined) as {
      url: string;
      name: string;
    }[];

    const currentImgNameList = currentImgList.map((file: File) => file.name);
    const fileArray = Array.from(files).filter(
      (file) => !currentImgNameList.includes(file.name)
    );

    setValue("imgData", [...currentImgList, ...fileArray], {
      shouldDirty: true,
      shouldValidate: true
    });

    if (newPreviews.length > 0) {
      addPreview(newPreviews);
    }
  };

  return { uploadFiles };
}
