import { getProfileProductListQuerykey } from "@/constants/constant";
import { getProfileProductList } from "@/lib/api/product";
import {
  ProductCategory,
  ProductData,
  ProductListType,
} from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
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
  const productId = router.query?.productId;

  const {
    data: profileProductListData,
    hasNextPage: hasNextPageProfileProductList,
    fetchNextPage: fetchNextPageProfileProductList,
    isFetchingNextPage: isFetchingNextPageProfileProductList,
    isLoading: isLoadingProfileProductList,
    error: profileProductListError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: getProfileProductListQuerykey(productId as string, category),
    queryFn: async ({ pageParam }) => {
      const response = await getProfileProductList({
        cursor: pageParam,
        category,
        limit,
        productIds,
      });
      return response.data.products;
    },
    enabled: productListType === "PROFILE" && productIds && !!productId,
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