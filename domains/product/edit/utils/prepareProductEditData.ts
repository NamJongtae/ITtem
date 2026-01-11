import uploadMultiImgToFirestore from "@/domains/product/upload/utils/uploadMultiProductImgToFirestore";
import { ProductData } from "../../shared/types/productTypes";
import { UploadImgResponseData } from "../../upload/types/productUploadTypes";
import { FieldValues } from "react-hook-form";

export default async function prepareProductEditData({
  values,
  productData,
  productEditData
}: {
  values: FieldValues;
  productData: ProductData;
  productEditData: Partial<ProductData>;
}) {
  for (const key of Object.keys(values)) {
    if (key === "price") {
      if (productData[key] !== parseInt(values.price.replace(",", ""), 10)) {
        productEditData.price = parseInt(values.price.replace(",", ""), 10);
      }
    } else if (key === "imgData") {
      if (values.imgData) {
        const prevImg = values.imgData.filter(
          (data: object) => !(data instanceof File)
        );
        const imgFiles = values.imgData.filter(
          (data: object) => data instanceof File
        );
        
        const imgData = await uploadMultiImgToFirestore(imgFiles);
        productEditData.imgData = [
          ...prevImg,
          ...(imgData as UploadImgResponseData[])
        ];
      }
    } else if (
      key === "description" ||
      key === "transaction" ||
      key === "deliveryFee" ||
      key === "returnPolicy" ||
      key === "condition" ||
      key === "location" ||
      key === "category" ||
      key === "name"
    ) {
      if (productData[key] !== values[key]) {
        productEditData[key] = values[key];
      }
    }
  }
}
