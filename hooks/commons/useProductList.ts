import {
  ProductCategory,
  ProductListType
} from "@/types/product-types";
import useProductTodayListInfiniteQuery from "../react-query/queries/product/useProductTodayListInfiniteQuery";
import useCategoryProductListInfiniteQuery from "../react-query/queries/product/useCategoryProductListInfiniteQuery";
import useSearchProductListInfiniteQuery from "../react-query/queries/product/useSearchProductListInfiniteQuery";
import { useSearchParams } from "next/navigation";
import useProfileProductListInfiniteQuery from "../react-query/queries/profile/useProfileProductListInfiniteQuery";


export default function useProductList(
  productListType: ProductListType,
  productIds?: string[],
  profileProductCategory?: ProductCategory
) {
  const search = useSearchParams();
  const keyword = search.get("keyword");
  const category =
    profileProductCategory ||
    (search.get("category") as ProductCategory) ||
    null;

  const emptyMessages: Record<ProductListType, string> = {
    TODAY: "오늘의 상품이 존재하지 않아요.",
    CATEGORY: "상품이 존재하지 않아요.",
    PROFILE: "상품이 존재하지 않아요.",
    MY_PROFILE: "상품이 존재하지 않아요.",
    SEARCH: `"${keyword}"에 대한 검색결과가 없어요.`
  };

  const emptyMessage =
    emptyMessages[productListType] || "상품이 존재하지 않아요.";

  // Query hooks
  const queries = {
    TODAY: useProductTodayListInfiniteQuery({ productListType }),
    CATEGORY: useCategoryProductListInfiniteQuery({
      category: category || undefined,
      productListType
    }),
    PROFILE: useProfileProductListInfiniteQuery({
      category: category || undefined,
      productListType,
      productIds: productIds || []
    }),
    MY_PROFILE: useProfileProductListInfiniteQuery({
      category: category || undefined,
      productListType,
      productIds: productIds || []
    }),
    SEARCH: useSearchProductListInfiniteQuery({
      category: category || undefined,
      productListType
    })
  };

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = queries[productListType];

  return {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    emptyMessage
  };
}
