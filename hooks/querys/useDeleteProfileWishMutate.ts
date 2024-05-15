import {
  MY_PROFILE_QUERY_KEY,
  MY_PROFILE_WISH_QUERY_KEY,
} from "@/constants/constant";
import { deleteProfileWish } from "@/lib/api/auth";
import { ProfileData } from "@/types/authTypes";
import { ProductData } from "@/types/productTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useDeleteProfileWishMutate() {
  const queryClient = useQueryClient();
  const { mutate: deleteWishMutate } = useMutation({
    mutationFn: (wishProductIds: string[]) => deleteProfileWish(wishProductIds),
    onMutate: async (wishProductIds) => {
      await queryClient.cancelQueries({ queryKey: MY_PROFILE_WISH_QUERY_KEY });

      await queryClient.cancelQueries({ queryKey: MY_PROFILE_WISH_QUERY_KEY });

      const previousMyProfile = queryClient.getQueryData(
        MY_PROFILE_QUERY_KEY
      ) as ProfileData | undefined;

      const previousWish = queryClient.getQueryData(
        MY_PROFILE_WISH_QUERY_KEY
      ) as InfiniteData<ProductData[], unknown> | undefined;

      const newMyProfile = {
        ...previousMyProfile,
        wishProductIds: [
          ...(previousMyProfile?.wishProductIds.filter(
            (productId: string) => !wishProductIds.includes(productId)
          ) || []),
        ],
      };

      const newWish = previousWish?.pages.map(
        (productDataList: ProductData[]) => {
          return productDataList.filter(
            (productData: ProductData) =>
              !wishProductIds.includes(productData._id)
          );
        }
      );

      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, newMyProfile);
      queryClient.setQueryData(MY_PROFILE_WISH_QUERY_KEY, {
        ...previousWish,
        pages: newWish,
      });
      
      toast.success("찜 목록 삭제에 성공했어요.");
      return { previousMyProfile, previousWish };
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, ctx?.previousMyProfile);
      queryClient.setQueryData(MY_PROFILE_WISH_QUERY_KEY, ctx?.previousWish);
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { deleteWishMutate };
}
