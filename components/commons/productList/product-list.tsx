import { Fragment } from "react";
import ProductItem from "./product-item";
import ProductListPlaceholder from "./product-list-placeholder";
import InfiniteScroll from "react-infinite-scroller";
import { ProductCategory, ProductListType } from "@/types/productTypes";
import ProductListError from "./product-list-error";
import useProductList from "@/hooks/commons/useProductList";

interface IProps {
  productListType: ProductListType;
  productIds?: string[];
  profileProductCategory?: ProductCategory;
}

export default function ProductList({ productListType, productIds, profileProductCategory }: IProps) {
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useProductList(productListType, productIds, profileProductCategory);
  

  return (
    <>
      {error && !data ? (
        <ProductListError productListType={productListType} error={error} />
      ) : null}

      <InfiniteScroll
        hasMore={hasNextPage && !error}
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
                <Fragment key={item._id}>
                  <ProductItem data={item} category={profileProductCategory}/>
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
