import ProductUploadCancelBtn from "./product-upload-cancel-btn";
import ProductUploadSubmitBtn from "./product-upload-submit-btn";

interface IProps {
  isEdit?: boolean;
}

export default function ProductUploadBtns({ isEdit }: IProps) {
  return (
    <div className="flex gap-3 justify-end w-full mt-5">
      <ProductUploadCancelBtn />
      <ProductUploadSubmitBtn isEdit={isEdit} />
    </div>
  );
}
