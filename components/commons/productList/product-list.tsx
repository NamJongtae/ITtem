import { Fragment } from "react";
import ProductItem from "./product-item";
import ProductListPlaceholder from "./product-list-placeholder";
import useProductTodayListInfiniteQuery from "@/hooks/querys/useProductTodayListInfiniteQuery";
import InfiniteScroll from "react-infinite-scroller";
import ProductListEmpty from "./product-list-empty";

export default function ProductList() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useProductTodayListInfiniteQuery();

  return (
    <>
      {data?.length === 0 && !isLoading && (
        <ProductListEmpty message={"오늘의 상품이 존재하지 않아요."} />
      )}

      {isError && <ProductListEmpty message={"오늘의 상품을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."} />}
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
