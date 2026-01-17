import ProductUploadImgUploadBtn from "./ImgUploadBtn";
import ProductImgEnlargeModal from "../../ProductImgEnlargeModal";
import ProductUploadImgEnlargeBtn from "./ImgEnlargeBtn";
import ImgInput from "./HiddenImgInput";
import ProductUploadImgPreviewList from "./ImgPreviewList";
import { ProductImgData } from "../../../../shared/types/productTypes";
import useProductUploadImgField from "../../../hooks/img-field/useProductUploadImgField";
interface IProps {
  imgData?: ProductImgData[];
}

export default function ImgField({ imgData }: IProps) {
  const {
    preview,
    handleOnChangeImg,
    handleRemoveImg,
    handleDropImgUpload,
    isOpenModal,
    handleOpenModal,
    handleClickImgInput,
    handleClickCloseBtn,
    imgInputRef
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
