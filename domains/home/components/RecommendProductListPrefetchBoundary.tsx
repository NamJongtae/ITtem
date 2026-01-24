import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import RecommendProductList from "./RecommendProductList";
import SuspenseErrorBoundary from "../../../shared/common/components/SuspenseErrorBoundary";
import ProductListSkeletonUI from "../../product/shared/components/product-list/ProductListSkeletonUI";
import ProductListError from "../../product/shared/components/product-list/ProductListError";
import dbConnect from "@/shared/common/utils/db/db";
import RecommendProduct from "@/domains/product/shared/models/RecommendProduct";
import { unstable_cache } from "next/cache";

export const getRecommendProducts = unstable_cache(
  async () => {
    try {
      await dbConnect();

      const cursorDate = new Date();
      const pageLimit = 12;

      const products = await RecommendProduct.find({
        createdAt: { $lt: cursorDate },
        block: false
      })
        .select(
          "_id name description uid createdAt status block imgData price location sellType category"
        )
        .sort({ createdAt: -1 })
        .limit(pageLimit)
        .lean();

      return JSON.parse(JSON.stringify(products));
    } catch (error) {
      console.error(error);
      throw new Error(
        "추천 상품 조회에 실패했어요. 잠시 후 다시 시도해주세요."
      );
    }
  },
  ["product-recommend"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["product-recommend"]
  }
);

async function prefetchProductListData(queryClient: QueryClient) {
  const queryKeyConfig = queryKeys.product.recommend(12);
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: () => getRecommendProducts(),
    initialPageParam: null
  });
}

export default async function RecommendProductListPrefetchBoundary() {
  const queryClient = new QueryClient();

  await prefetchProductListData(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuspenseErrorBoundary
        suspenseFallback={<ProductListSkeletonUI listCount={8} />}
        errorFallback={<ProductListError productListType="RECOMMEND" />}
      >
        <RecommendProductList />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
