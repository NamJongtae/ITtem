import { FieldValues } from "react-hook-form";
import { ProductData, ProductImgData } from "../types/productTypes";
import deleteProductImgToFirestore from "./deleteProductImgToFirestore";

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
    await deleteProductImgToFirestore(productDataImgName, prevImgDataImgName);
  }
}
