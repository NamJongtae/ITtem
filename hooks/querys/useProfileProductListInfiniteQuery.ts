import {
  MY_PROFILE_QUERY_KEY,
  getMyProfileProductListQuerykey,
  getProfileProductListQuerykey,
} from "@/constants/constant";
import { getProfileProductList } from "@/lib/api/product";
import { RootState } from "@/store/store";
import { ProfileData } from "@/types/authTypes";
import {
  ProductCategory,
  ProductData,
  ProductListType,
} from "@/types/productTypes";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export default function useProfileProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType,
  productIds,
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
  productIds: string[];
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const myProfile = queryClient.getQueryData(MY_PROFILE_QUERY_KEY) as
    | ProfileData
    | undefined;

  const uid =
    productListType === "MY_PROFILE"
      ? myProfile?.uid || ""
      : router.query?.uid || "";

  const {
    data: profileProductListData,
    hasNextPage: hasNextPageProfileProductList,
    fetchNextPage: fetchNextPageProfileProductList,
    isFetchingNextPage: isFetchingNextPageProfileProductList,
    isLoading: isLoadingProfileProductList,
    error: profileProductListError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey:
      productListType === "MY_PROFILE"
        ? getMyProfileProductListQuerykey(category)
        : getProfileProductListQuerykey(uid as string, category),
    queryFn: async ({ pageParam }) => {
      const response = await getProfileProductList({
        cursor: pageParam,
        category,
        limit,
        productIds,
      });
      return response.data.products;
    },
    enabled:
      (productListType === "PROFILE" || productListType === "MY_PROFILE") &&
      productIds.length > 0 &&
      !!uid,
    retry: 0,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1].createdAt;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    },
  });

  return {
    profileProductListData: profileProductListData?.pages.flat(),
    hasNextPageProfileProductList,
    fetchNextPageProfileProductList,
    isFetchingNextPageProfileProductList,
    isLoadingProfileProductList,
    profileProductListError,
  };
}
