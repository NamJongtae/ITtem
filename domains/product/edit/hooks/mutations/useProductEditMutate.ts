import editProduct from "../../api/editProduct";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProductResponseData } from "../../../shared/types/reponseTypes";
import { ProductData } from "../../../shared/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams, useRouter } from "next/navigation";

export default function useProductEditMutate() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();

  const {
    mutateAsync: productEditMutate,
    isPending: productEditLoading,
    isError: productEditError
  } = useMutation<
    AxiosResponse<ProductResponseData>,
    AxiosError,
    Partial<ProductData>
  >({
    mutationFn: (productData: Partial<ProductData>) =>
      editProduct(productId as string, productData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.product.detail(productId as string).queryKey
      });
      router.push(`/product/${response.data.product._id}`);
      window.scrollTo(0, 0);
    }
  });

  return { productEditMutate, productEditLoading, productEditError };
}
