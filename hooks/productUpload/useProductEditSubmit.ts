import { FieldValues } from "react-hook-form";
import useProductEditMutate from "../reactQuery/mutations/product/useProductEditMutate";
import { ProductData, ProductImgData } from "@/types/productTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  deleteImgToFirestore,
  uploadMultiImgToFirestore,
} from "@/lib/api/firebase";
import { UploadImgResponseData } from "@/types/apiTypes";
import { useState } from "react";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { queryKeys } from "@/queryKeys";

export default function useProductEditSubmit() {
  const [productEditLoading, setProductEditLoading] = useState(false);

  const { productEditMutate } = useProductEditMutate();
  const queryClient = useQueryClient();
  const params = useParams();
  const productId = params?.productId;
  let productEditData = {} as Partial<ProductData>;
  const productDetailQuerykKey = queryKeys.product.detail(
    productId as string
  ).queryKey;

  const productData =
    queryClient.getQueryData(productDetailQuerykKey) as ProductData ||
    undefined;

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
          const imgFiles = values.imgData.filter(
            (data: object) => data instanceof File
          );
          const imgData = await uploadMultiImgToFirestore(imgFiles);
          productEditData.imgData = [
            ...values.prevImgData,
            ...(imgData as UploadImgResponseData[]),
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

  const handleClickProductEditSubmit = async (values: FieldValues) => {
    try {
      setProductEditLoading(true);
      await setProductEditData(values);
      await deleteImages(values);
      await productEditMutate(productEditData);
    } catch (error) {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.warn(error.message);
      }
    } finally {
      setProductEditLoading(false);
    }
  };

  return {
    handleClickProductEditSubmit,
    productEditLoading,
  };
}
