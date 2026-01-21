import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import PopularProductSlider from "./PopularProductSlider";
import SuspenseErrorBoundary from "../../../shared/common/components/SuspenseErrorBoundary";
import PopularProductListSkeletonUI from "./PopularProductListSkeletonUI";
import ProductListError from "../../product/shared/components/product-list/ProductListError";
import dbConnect from "@/shared/common/utils/db/db";
import Product from "@/domains/product/shared/models/Product";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";

export const getPopularProducts = async () => {
  try {
    await dbConnect();

    const products = await Product.find({
      block: false,
      status: ProductStatus.sold
    })
      .select(
        "_id name description uid createdAt status block imgData price location sellType category"
      )
      .sort({ viewCount: -1 })
      .limit(12)
      .lean(); // Mongoose 객체를 순수 JS 객체로 변환

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(error);
    throw new Error("인기 상품 조회 실패"); // 에러를 던져서 prefetchQuery가 실패를 인지하게 함
  }
};
async function prefetchPopularProduct(queryClient: QueryClient) {
  const queryKeyConfig = queryKeys.product.popular;
  await queryClient.prefetchQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: () => getPopularProducts()
  });
}

export default async function PopularProductSliderPrefetchBoundary() {
  const queryClinet = new QueryClient();
  await prefetchPopularProduct(queryClinet);

  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <SuspenseErrorBoundary
        suspenseFallback={<PopularProductListSkeletonUI />}
        errorFallback={<ProductListError productListType="POPULAR" />}
      >
        <PopularProductSlider />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
