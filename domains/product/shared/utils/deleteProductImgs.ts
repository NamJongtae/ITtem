import { ProductData, ProductImgData } from "../types/productTypes";
import deleteProductImgsToFirestore from "./deleteProductImgsToFirestore";

export default async function deleteProductImgs({
  productData,
  productEditData
}: {
  productData: ProductData;
  productEditData: Partial<ProductData>;
}) {
  if (productEditData.imgData) {
    const productDataImgName = productData.imgData.map((data) => data.name);
    const productEditImgDataImgName = productEditData.imgData.map(
      (data: ProductImgData) => data.name
    );
    await deleteProductImgsToFirestore(productDataImgName, productEditImgDataImgName);
  }
}
