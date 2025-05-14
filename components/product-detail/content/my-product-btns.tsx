import ProductDetailEditBtn from "../product-detail-edit-btn";
import ProductDetailDeleteBtn from "../product-detail-delete-btn";
import { ProductStatus } from "@/types/product-types";

interface IProps {
  productStatus: ProductStatus | undefined;
}

export default function MyProfileBtns({ productStatus }: IProps) {
  return (
    <>
      <ProductDetailEditBtn productStatus={productStatus} />
      <ProductDetailDeleteBtn productStatus={productStatus} />
    </>
  );
}
