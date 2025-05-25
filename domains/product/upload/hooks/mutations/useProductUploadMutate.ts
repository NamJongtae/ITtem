import { uploadMultiImgToFirestore } from "@/shared/common/utils/api/firebase";
import uploadProduct from "../../api/uploadProduct";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { ProductResponseData } from "../../../shared/types/reponseTypes";
import { ProductImgData } from "../../../shared/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { ProductUploadData } from "../../types/productUploadTypes";

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
