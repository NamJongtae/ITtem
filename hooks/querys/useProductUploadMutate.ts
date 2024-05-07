import { getProfileProductListQuerykey } from "@/constants/constant";
import { uploadProduct } from "@/lib/api/product";
import { ProductResponseData } from "@/types/apiTypes";
import { ProductUploadData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

export default function useProductUploadMutate() {
  const router = useRouter();
  const queryCliecnt = useQueryClient();

  const { mutateAsync: productUploadMuate, isPending: productUploadLoading } =
    useMutation<
      AxiosResponse<ProductResponseData>,
      AxiosError,
      ProductUploadData
    >({
      mutationFn: async (productData) => await uploadProduct(productData),
      onSuccess: async (response) => {
        await router.push(`/product/${response.data.product._id}`);
        queryCliecnt.invalidateQueries({
          queryKey: getProfileProductListQuerykey(response.data.product.uid),
        });
      },
    });
  return { productUploadMuate, productUploadLoading };
}
