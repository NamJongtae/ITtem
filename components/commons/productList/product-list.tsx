import { Fragment } from "react";
import ProductItem from "./product-item";
import ProductListPlaceholder from "./product-list-placeholder";
import useProductTodayListInfiniteQuery from "@/hooks/querys/useProductTodayListInfiniteQuery";
import InfiniteScroll from "react-infinite-scroller";
import ProductListEmpty from "./product-list-empty";
import useCategoryProductListInfiniteQuery from "@/hooks/querys/useCategoryProductListInfiniteQuery";
import { useSearchParams } from "next/navigation";
import { ProductCategory, ProductListType } from "@/types/productTypes";

interface IProps {
  productListType: ProductListType;
}

export default function ProductList({ productListType }: IProps) {
  const search = useSearchParams();
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

  const isLoading =
    productListType === "TODAY"
      ? isLoadingTodayProductList
      : isLoadingCategoryProductList;
  const data =
    productListType === "TODAY"
      ? todayProductListData
      : categoryProductListData;
  const fetchNextPage =
    productListType === "TODAY"
      ? fetchNextPageTodayProductList
      : fetchNextPageCategoryProductList;
  const isFetchingNextPage =
    productListType === "TODAY"
      ? isFetchingNextPageTodayProductList
      : isFetchingNextPageCategoryProductList;
  const hasNextPage =
    productListType === "TODAY"
      ? hasNextPageTodayProductList
      : hasNextPageCategoryProductList;
  const isError =
    productListType === "TODAY"
      ? isErrorTodayProductList
      : isErrorCategoryProductList;

  return (
    <>
      {data?.length === 0 && !isLoading && (
        <ProductListEmpty
          message={`${
            productListType === "TODAY" ? "오늘의" : ""
          } 상품이 존재하지 않아요.`}
        />
      )}

      {isError && (
        <ProductListEmpty
          message={`${
            productListType === "TODAY" ? "오늘의" : ""
          } 상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요.`}
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
