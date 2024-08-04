import ProductUploadImgUploadBtn from "./product-upload-img-upload-Btn";
import ProductImgEnlargeModal from "../../commons/product-img-enlarge-modal";
import ProductUploadImgEnlargeBtn from "./product-upload-img-enlarge-btn";
import ImgInput from "./product-upload-img-input";
import ProductUploadImgPreviewList from "./product-upload-img-preview-list";
import { ProductImgData } from "@/types/product-types";
import useProductUploadImgField from "@/hooks/product-upload/useProductUploadimgField";

interface IProps {
  imgData?: ProductImgData[];
}

export default function ProductUploadImgField({ imgData }: IProps) {
  const {
    preview,
    handleOnChangeImg,
    handleRemoveImg,
    handleDropImgUpload,
    isOpenModal,
    handleOpenModal,
    handleClickImgInput,
    handleClickCloseBtn,
    imgInputRef,
  } = useProductUploadImgField(imgData);

  return (
    <div className="border-b py-8">
      <div className="flex items-center gap-3">
        <ImgInput
          preview={preview}
          onChangeImg={handleOnChangeImg}
          ref={imgInputRef}
        />
        <ProductUploadImgEnlargeBtn handleOpenModal={handleOpenModal} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-5 mt-5">
        <ProductUploadImgUploadBtn
          handleClickImgInput={handleClickImgInput}
          handleDropImgUpload={handleDropImgUpload}
        />
        <ProductUploadImgPreviewList
          imgData={preview}
          handleRemoveImg={handleRemoveImg}
        />
      </div>

      {isOpenModal && (
        <ProductImgEnlargeModal
          imgData={preview}
          handleClickCloseBtn={handleClickCloseBtn}
        />
      )}
    </div>
  );
}
