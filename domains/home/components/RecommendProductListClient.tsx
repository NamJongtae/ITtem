"use client";

import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";
import dynamic from "next/dynamic";

const RecommendProductList = dynamic(() => import("./RecommendProductList"), {
  ssr: false,
  loading: () => <ProductListSkeletonUI listCount={12} />
});

export default function RecommendProductListClient({
  nextCursor
}: {
  nextCursor: string | null;
}) {
  return <RecommendProductList nextCursor={nextCursor} />;
}
