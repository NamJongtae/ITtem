import { useRef } from "react";
import ImgUploadBtn from "./img-upload-Btn";
import { toast } from "react-toastify";
import ProductImgEnlargeModal from "./product-img-enlarge-modal";
import ImgEnlargeBtn from "./img-enlarge-btn";
import ImgInput from "./img-input";
import ImgPreviewList from "./img-preview-list";
import useProductImg from "@/hooks/productUpload/useProductUploadimg";
import useModal from "@/hooks/commons/useModal";
import { ProductImgData } from "@/types/productTypes";

interface IProps {
  imgData?: ProductImgData[];
}

export default function ProductUploadImgField({ imgData }: IProps) {
  const { preview, handleOnChangeImg, handleRemoveImg, handleDropImgUpload } =
    useProductImg(imgData);
  const { isOpenModal, openModal, closeModal } = useModal();
  const imgInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="border-b py-8">
      <div className="flex items-center gap-3">
        <ImgInput
          preview={preview}
          onChangeImg={handleOnChangeImg}
          ref={imgInputRef}
        />
        <ImgEnlargeBtn handleOpenModal={handleOpenModal} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-5 mt-5">
        <ImgUploadBtn
          handleClickImgInput={handleClickImgInput}
          handleDropImgUpload={handleDropImgUpload}
        />
        <ImgPreviewList imgData={preview} handleRemoveImg={handleRemoveImg} />
      </div>

      {isOpenModal && (
        <ProductImgEnlargeModal imgData={preview} closeModal={closeModal} />
      )}
    </div>
  );
}
