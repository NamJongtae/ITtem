import { FieldValues } from "react-hook-form";
import useProductEditMutate from "../react-query/mutations/product/useProductEditMutate";
import { ProductData } from "@/types/product-types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { queryKeys } from "@/query-keys/query-keys";
import { deleteProductImages, setProductEditData } from "@/lib/api/product";
import { useParams } from "next/navigation";

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
      await setProductEditData({ values, productData, productEditData });
      await deleteProductImages({ values, productData, productEditData });
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
