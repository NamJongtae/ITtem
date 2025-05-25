import { ProductImgData } from "../../../shared/types/productTypes";
import NameField from "./NameField";
import SellTypeField from "./SellTypeField";
import CategoryField from "./CategoryField";
import LocationField from "./LocationField";
import ConditionField from "./ConditionField";
import ReturnPolicyField from "./ReturnPolicyField";
import TransactionField from "./TransactionField";
import PriceField from "./PriceField";
import DescField from "./DescField";
import DeliveryFeeField from "./DeliveryFeeField";
import ImgField from "./imgField/ImgField";
import ProductUploadBtns from "./btns/ProductUploadBtns";

interface IProps {
  imgData?: ProductImgData[];
}
export default function FormContent({ imgData }: IProps) {
  return (
    <>
      <ImgField imgData={imgData} />
      <NameField />
      <SellTypeField />
      <CategoryField />
      <LocationField />
      <ConditionField />
      <ReturnPolicyField />
      <TransactionField />
      <PriceField />
      <DeliveryFeeField />
      <DescField />
      <ProductUploadBtns />
    </>
  );
}
