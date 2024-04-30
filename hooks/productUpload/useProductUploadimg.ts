import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { imgValidation } from '@/lib/imgValidation';
import { ProductImgData } from '@/types/productTypes';

export default function useProductUploadImg(imgData?: ProductImgData[]) {
  const [preview, setPreview] = useState<ProductImgData[]>(imgData || []);

  const uploadValidationAndPreview = useCallback(
    (file: File) => {
      const fileName = file.name;
      const isValid = imgValidation(file);
      const isUploaded = preview.some((item) => item.name === fileName);

      if (!isValid) return;
      if (isUploaded) {
        toast.warn(`${fileName}은(는) 이미 업로드한 이미지입니다.`);
        return;
      }

      const imgPreview = URL.createObjectURL(file);
      return { url: imgPreview, name: fileName };
    },
    [preview]
  );

  const handleFilesUpload = useCallback(
    (files: FileList) => {
      const availableSlots = 5 - preview.length;

      if (availableSlots - files.length < 0) {
        toast.warn("최대 5개의 이미지까지 업로드 가능합니다.");
        return;
      }

      const newPreviews = Array.from(files)
        .map(uploadValidationAndPreview)
        .filter((preview) => preview !== undefined) as {
        url: string;
        name: string;
      }[];

      if (newPreviews.length > 0) {
        setPreview((prev) => [...prev, ...newPreviews]);
      }
    },
    [preview, uploadValidationAndPreview]
  );

  const handleImgUpload = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      handleFilesUpload(fileList);
    },
    [handleFilesUpload]
  );

  const handleDropImgUpload = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;
      handleFilesUpload(files);
    },
    [handleFilesUpload]
  );

  const handleOnChangeImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleImgUpload(e.target.files);
    },
    [handleImgUpload]
  );

  const handleRemoveImg = useCallback((idx: number) => {
    setPreview((prev) => prev.filter((_, itemIdx) => itemIdx !== idx));
  }, []);

  return { preview, handleOnChangeImg, handleRemoveImg, handleDropImgUpload };
}
