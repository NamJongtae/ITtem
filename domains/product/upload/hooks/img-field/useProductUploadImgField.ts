import { useRef, useCallback } from "react";
import useModal from "@/shared/common/hooks/useModal";
import { useProductUploadImgPreview } from "./useProductUploadImgPreview";
import { useProductImgUploader } from "./useProductImgUploader";
import { toast } from "react-toastify";
import { ProductImgData } from "../../../shared/types/productTypes";

export default function useProductUploadImgField(imgData?: ProductImgData[]) {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const { isOpenModal, openModal, handleClickCloseBtn } = useModal();
  const { preview, addPreview, removePreview } =
    useProductUploadImgPreview(imgData);
  const { uploadFiles } = useProductImgUploader(preview, addPreview);

  const handleDropImgUpload = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      uploadFiles(e.dataTransfer.files);
    },
    [uploadFiles]
  );

  const handleOnChangeImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList || fileList.length === 0) return;
      uploadFiles(fileList);
    },
    [uploadFiles]
  );

  const handleOpenModal = useCallback(() => {
    if (preview.length === 0) {
      toast.warn("이미지가 존재하지 않습니다.");
      return;
    }
    openModal();
  }, [preview, openModal]);

  const handleClickImgInput = useCallback(() => {
    if (!imgInputRef.current) return;
    imgInputRef.current?.click();
  }, [imgInputRef]);

  return {
    preview,
    handleOnChangeImg,
    handleRemoveImg: removePreview,
    handleDropImgUpload,
    isOpenModal,
    handleOpenModal,
    handleClickImgInput,
    openModal,
    handleClickCloseBtn,
    imgInputRef
  };
}
