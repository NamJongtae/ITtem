import { FieldValues } from "react-hook-form";
import useProductEditMutate from "../querys/useProductEditMutate";
import { ProductData, ProductImgData } from "@/types/productTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  deleteImgToFirestore,
  uploadMultiImgToFirestore,
} from "@/lib/api/firebase";
import { UploadImgResponseData } from "@/types/apiTypes";

export default function useProductEditSubmit() {
  const { productEditMutate, productEditLoading } = useProductEditMutate();
  const queryClient = useQueryClient();
  const params = useParams();
  const productId = params?.productId;
  let productEditData = {} as Partial<ProductData>;

  /**
   * 상품 수정시 수정된 데이터만 설정하는 함수
   */
  const setProductEditData = async (values: FieldValues) => {
    for (const key of Object.keys(values)) {
      if (key === "price") {
        if (productData[key] !== parseInt(values.price.replace(",", ""), 10)) {
          productEditData.price = parseInt(values.price.replace(",", ""), 10);
        }
      } else if (key === "prevImgData") {
        if (
          JSON.stringify(productData?.imgData) !==
          JSON.stringify(values.prevImgData)
        ) {
          productEditData.imgData = values.prevImgData;
        }
        if (values.imgData) {
          const imgData = await uploadMultiImgToFirestore(
            values.imgData.filter((data: object) => data instanceof File)
          );
          productEditData.imgData = [
            ...values.prevImgData,
            ...(imgData as UploadImgResponseData[]),
          ];
        }
      }
    }
  };

  /**
   * 상품 수정시 삭제된 이미지 삭제 함수
   */
  const deleteImages = async (values: FieldValues) => {
    if (productEditData.imgData && values.prevImgData) {
      const productDataImgName = productData.imgData.map((data) => data.name);
      const prevImgDataImgName = values.prevImgData.map(
        (data: ProductImgData) => data.name
      );
      await deleteImgToFirestore(productDataImgName, prevImgDataImgName);
    }
  };

  const productData =
    (queryClient.getQueryData(["product", productId]) as ProductData) ||
    undefined;

  const handleClickProductEditSubmit = async (values: FieldValues) => {
    await setProductEditData(values);
    await deleteImages(values);
    productEditMutate(productEditData);
  };

  return { handleClickProductEditSubmit, productEditLoading };
}
