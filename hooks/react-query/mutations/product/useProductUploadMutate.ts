import { uploadMultiImgToFirestore } from "@/lib/api/firebase";
import { uploadProduct } from "@/lib/api/product";
import { queryKeys } from "@/query-keys/query-keys";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { ProductResponseData } from "@/types/api-types";
import { ProductImgData, ProductUploadData } from "@/types/product-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";

export default function useProductUploadMutate() {
  const router = useRouter();
  const queryCliecnt = useQueryClient();
  const myProfileQueryKey = queryKeys.profile.my._ctx.products._def;
  const { actions } = useGlobalLoadingStore();

  const {
    mutateAsync: productUploadMuate,
    isPending: productUploadLoading,
    isError: productUploadError
  } = useMutation<
    AxiosResponse<ProductResponseData>,
    AxiosError,
    { productData: ProductUploadData; values: FieldValues }
  >({
    onMutate: () => {
      actions.startLoading();
    },
    mutationFn: async ({ productData, values }) => {
      const imgData = (await uploadMultiImgToFirestore(values.imgData)) as
        | ProductImgData[]
        | undefined;

      return await uploadProduct({ ...productData, imgData: imgData || [] });
    },
    onSuccess: (response) => {
      queryCliecnt.invalidateQueries({
        queryKey: myProfileQueryKey
      });
      router.push(`/product/${response.data.product._id}`);
      window.scrollTo(0, 0);
    },
    onSettled: () => {
      actions.stopLoading();
    }
  });

  return { productUploadMuate, productUploadLoading, productUploadError };
}
