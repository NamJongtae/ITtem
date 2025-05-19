import { ProductImgData } from "@/types/product-types";
import ProductUploadNameField from "./product-upload-name-field";
import ProductUploadSellTypeField from "./product-upload-sellType-field";
import ProductUploadCategoryField from "./product-upload-category-field";
import ProductUploadLocationField from "./product-upload-location-field";
import ProductUploadConditionField from "./product-upload-condition-field";
import ProductUploadReturnPolicyField from "./product-upload-return-policy-field";
import ProductUploadTransactionField from "./product-upload-transaction-field";
import ProductUploadPriceField from "./product-upload-price-field";
import ProductUploadDescField from "./product-upload-desc-field";
import ProductUploadDeliveryFeeField from "./product-upload-deliveryFee-field";
import ProductUploadBtns from "./btns/product-upload-btns";
import ProductUploadImgField from "./imgField/product-upload-img-field";

interface IProps {
  imgData?: ProductImgData[];
}
export default function ProductUploadFormContent({ imgData }: IProps) {
  return (
    <>
      <ProductUploadImgField imgData={imgData} />
      <ProductUploadNameField />
      <ProductUploadSellTypeField />
      <ProductUploadCategoryField />
      <ProductUploadLocationField />
      <ProductUploadConditionField />
      <ProductUploadReturnPolicyField />
      <ProductUploadTransactionField />
      <ProductUploadPriceField />
      <ProductUploadDeliveryFeeField />
      <ProductUploadDescField />
      <ProductUploadBtns />
    </>
  );
}
