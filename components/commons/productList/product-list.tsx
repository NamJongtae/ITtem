import { Fragment } from "react";
import ProductItem from "./product-item";
import ProductListPlaceholder from "./product-list-placeholder";
import useProductTodayListInfiniteQuery from "@/hooks/querys/useProductTodayListInfiniteQuery";
import InfiniteScroll from "react-infinite-scroller";
import ProductListEmpty from "./product-list-empty";
import useCategoryProductListInfiniteQuery from "@/hooks/querys/useCategoryProductListInfiniteQuery";
import { useSearchParams } from "next/navigation";
import { ProductCategory, ProductListType } from "@/types/productTypes";
import useSearchProductListInfiniteQuery from "@/hooks/querys/useSearchProductListInfiniteQuery";

interface IProps {
  productListType: ProductListType;
}

export default function ProductList({ productListType }: IProps) {
  const search = useSearchParams();
  const keyword = search.get("keyword");

  const category = (search.get("category") as ProductCategory) || null;
  const {
    todayProductListData,
    hasNextPageTodayProductList,
    fetchNextPageTodayProductList,
    isFetchingNextPageTodayProductList,
    isLoadingTodayProductList,
    isErrorTodayProductList,
  } = useProductTodayListInfiniteQuery({ productListType });

  const {
    categoryProductListData,
    hasNextPageCategoryProductList,
    fetchNextPageCategoryProductList,
    isFetchingNextPageCategoryProductList,
    isLoadingCategoryProductList,
    isErrorCategoryProductList,
  } = useCategoryProductListInfiniteQuery({
    category: category || undefined,
    productListType,
  });

  const {
    searchProductListData,
    hasNextPageSearchProductList,
    fetchNextPageSearchProductList,
    isFetchingNextPageSearchProductList,
    isLoadingSearchProductList,
    isErrorSearchProductList,
  } = useSearchProductListInfiniteQuery({
    category: category || undefined,
    productListType,
  });

  const isLoading =
    productListType === "TODAY"
      ? isLoadingTodayProductList
      : productListType === "CATEGORY"
      ? isLoadingCategoryProductList
      : isLoadingSearchProductList;

  const data =
    productListType === "TODAY"
      ? todayProductListData
      : productListType === "CATEGORY"
      ? categoryProductListData
      : searchProductListData;

  const fetchNextPage =
    productListType === "TODAY"
      ? fetchNextPageTodayProductList
      : productListType === "CATEGORY"
      ? fetchNextPageCategoryProductList
      : fetchNextPageSearchProductList;

  const isFetchingNextPage =
    productListType === "TODAY"
      ? isFetchingNextPageTodayProductList
      : productListType === "CATEGORY"
      ? isFetchingNextPageCategoryProductList
      : isFetchingNextPageSearchProductList;

  const hasNextPage =
    productListType === "TODAY"
      ? hasNextPageTodayProductList
      : productListType === "CATEGORY"
      ? hasNextPageCategoryProductList
      : hasNextPageSearchProductList;

  const isError =
    productListType === "TODAY"
      ? isErrorTodayProductList
      : productListType === "CATEGORY"
      ? isErrorCategoryProductList
      : isErrorSearchProductList;

  return (
    <>
      {data?.length === 0 && !isLoading && (
        <ProductListEmpty
          message={`${
            productListType === "TODAY"
              ? "오늘의 상품이 존재하지 않아요."
              : productListType === "CATEGORY"
              ? "상품이 존재하지 않아요."
              : `${'"' + keyword + '"'}에 대한 검색결과가 없어요.`
          } `}
        />
      )}

      {isError && (
        <ProductListEmpty
          message={`${
            productListType === "TODAY"
              ? "오늘의 상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
              : productListType === "CATEGORY"
              ? "상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
              : "검색 결과를 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
          }`}
        />
      )}

      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={() => {
          if (!isFetchingNextPage) fetchNextPage();
        }}
      >
        <div className="max-w-[1024px] mx-auto pb-12">
          <ul className="grid gap-5 grid-cols-autoFill mt-6 px-8 ">
            {isLoading ? (
              <ProductListPlaceholder listCount={12} />
            ) : (
              data?.map((item) => (
                <Fragment key={item.id}>
                  <ProductItem data={item} />
                </Fragment>
              ))
            )}
            {isFetchingNextPage && <ProductListPlaceholder listCount={12} />}
          </ul>
        </div>
      </InfiniteScroll>
    </>
  );
}
