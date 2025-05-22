import ProductUploadCancelBtn from "./product-upload-cancel-btn";
import ProductUploadSubmitBtn from "./product-upload-submit-btn";

export default function ProductUploadBtns() {
  return (
    <div className="flex gap-3 justify-end w-full mt-5">
      <ProductUploadCancelBtn />
      <ProductUploadSubmitBtn />
    </div>
  );
}
