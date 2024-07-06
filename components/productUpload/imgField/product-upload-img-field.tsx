import ImgUploadBtn from "./img-upload-Btn";
import ProductImgEnlargeModal from "./product-img-enlarge-modal";
import ImgEnlargeBtn from "./img-enlarge-btn";
import ImgInput from "./img-input";
import ImgPreviewList from "./img-preview-list";
import { ProductImgData } from "@/types/productTypes";
import useProductUploadImgField from '@/hooks/productUpload/useProductUploadimgField';

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
        <ProductImgEnlargeModal imgData={preview} handleClickCloseBtn={handleClickCloseBtn} />
      )}
    </div>
  );
}
