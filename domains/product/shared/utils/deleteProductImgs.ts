import { FieldValues } from "react-hook-form";
import { ProductData, ProductImgData } from "../types/productTypes";
import { deleteImgToFirestore } from "@/shared/common/utils/api/firebase";

export default async function deleteProductImgs({
  values,
  productData,
  productEditData
}: {
  values: FieldValues;
  productData: ProductData;
  productEditData: Partial<ProductData>;
}) {
  if (productEditData.imgData && values.prevImgData) {
    const productDataImgName = productData.imgData.map((data) => data.name);
    const prevImgDataImgName = values.prevImgData.map(
      (data: ProductImgData) => data.name
    );
    await deleteImgToFirestore(productDataImgName, prevImgDataImgName);
  }
}
