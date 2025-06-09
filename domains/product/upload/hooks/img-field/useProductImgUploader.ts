import { imgValidation } from "@/shared/common/utils/imgValidation";
import { ProductImgData } from "../../../shared/types/productTypes";
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

    const validFiles: File[] = [];
    const newPreviews: ProductImgData[] = [];

    Array.from(files).forEach((file) => {
      const previewItem = validateAndPreview(file);
      if (previewItem) {
        validFiles.push(file);
        newPreviews.push(previewItem);
      }
    });

    if (validFiles.length > 0) {
      setValue("imgData", [...currentImgList, ...validFiles], {
        shouldDirty: true,
        shouldValidate: true
      });

      addPreview(newPreviews);
    }
  };

  return { uploadFiles };
}
