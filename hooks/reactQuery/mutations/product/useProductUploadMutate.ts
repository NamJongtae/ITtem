import { uploadProduct } from "@/lib/api/product";
import { queryKeys } from "@/queryKeys";
import { ProductResponseData } from "@/types/apiTypes";
import { ProductUploadData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export default function useProductUploadMutate() {
  const router = useRouter();
  const queryCliecnt = useQueryClient();
  const myProfileQueryKey = queryKeys.profile.my._ctx.products._def;

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
          queryKey: myProfileQueryKey,
        });
      },
    });
  return { productUploadMuate, productUploadLoading };
}
