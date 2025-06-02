import { FieldValues } from "react-hook-form";
import useProductEditMutate from "./mutations/useProductEditMutate";
import { ProductData } from "../../shared/types/productTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import deleteProductImgs from "../../shared/utils/deleteProductImgs";
import { useParams } from "next/navigation";
import prepareProductEditData from "../utils/prepareProductEditData";

export default function useProductEditSubmit() {
  const [productEditLoading, setProductEditLoading] = useState(false);
  const [productEditError, setProductEditError] = useState(false);
  const params = useParams();
  const productId = params.productId;
  const productEditData = {} as Partial<ProductData>;

  const { productEditMutate } = useProductEditMutate();
  const queryClient = useQueryClient();
  const productDetailQuerykKey = queryKeys.product.detail(
    productId as string
  ).queryKey;

  const productData =
    (queryClient.getQueryData(productDetailQuerykKey) as ProductData) ||
    undefined;

  const onSubmit = async (values: FieldValues) => {
    try {
      setProductEditLoading(true);
      setProductEditError(false);
      await prepareProductEditData({ values, productData, productEditData });
      await deleteProductImgs({ productData, productEditData });
      await productEditMutate(productEditData);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(error);
      }
      toast.warn("상품 수정에 실패했어요.\n 잠시후 다시 시도해주세요.");
      setProductEditError(true);
    } finally {
      setProductEditLoading(false);
    }
  };

  return {
    onSubmit,
    productEditLoading,
    productEditError
  };
}
