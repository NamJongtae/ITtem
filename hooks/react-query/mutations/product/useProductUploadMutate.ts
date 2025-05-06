import { uploadProduct } from "@/lib/api/product";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductResponseData } from "@/types/api-types";
import { ProductUploadData } from "@/types/product-types";
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
      onSuccess: (response) => {
        queryCliecnt.invalidateQueries({
          queryKey: myProfileQueryKey
        });
        router.push(`/product/${response.data.product._id}`);
        window.scrollTo(0, 0);
      }
    });
  return { productUploadMuate, productUploadLoading };
}
