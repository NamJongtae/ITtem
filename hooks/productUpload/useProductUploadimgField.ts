import { useState, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { imgValidation } from "@/lib/imgValidation";
import { ProductImgData } from "@/types/productTypes";
import { useFormContext } from "react-hook-form";
import useModal from "../commons/useModal";

export default function useProductUploadImgField(imgData?: ProductImgData[]) {
  const { isOpenModal, openModal, closeModal } = useModal();
  const imgInputRef = useRef<HTMLInputElement>(null);

  const { setValue, getValues } = useFormContext();
  const [preview, setPreview] = useState<ProductImgData[]>(imgData || []);
  const currentImgList = getValues("imgData");

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

  const handleFilesUpload = (files: FileList) => {
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

    const currentImgNameList = currentImgList.map((file: File) => file.name);
    const fileArray = Array.from(files).filter(
      (file) => !currentImgNameList.includes(file.name)
    );

    setValue("imgData", [...currentImgList, ...fileArray], {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (newPreviews.length > 0) {
      setPreview((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleDropImgUpload = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;
      handleFilesUpload(files);
    },
    []
  );

  const handleOnChangeImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList || fileList.length === 0) return;
      handleFilesUpload(fileList);
    },
    []
  );

  const handleRemoveImg = useCallback(
    (idx: number) => {
      const currentImgList = getValues("imgData");
      const currentPrevImgDataList = getValues("prevImgData");
      setPreview((prev) => prev.filter((_, itemIdx) => itemIdx !== idx));

      setValue(
        "imgData",
        currentImgList.filter((_: unknown, itemIdx: number) => itemIdx !== idx),
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue(
        "prevImgData",
        currentPrevImgDataList.filter(
          (_: unknown, itemIdx: number) => itemIdx !== idx
        ),
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    },
    [getValues, setValue]
  );

  const handleOpenModal = () => {
    if (preview.length === 0) {
      toast.warn("이미지가 존재하지않습니다.");
      return;
    }
    openModal();
  };

  const handleClickImgInput = () => {
    if (!imgInputRef.current) return;
    imgInputRef.current?.click();
  };

  return {
    preview,
    handleOnChangeImg,
    handleRemoveImg,
    handleDropImgUpload,
    isOpenModal,
    handleOpenModal,
    handleClickImgInput,
    openModal,
    closeModal,
    imgInputRef,
  };
}
