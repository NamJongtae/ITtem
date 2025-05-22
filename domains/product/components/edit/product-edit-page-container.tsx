import { queryKeys } from "@/query-keys/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import React from "react";
import ProductEditPage from "./product-edit-page";

interface IProps {
  productId: string | undefined;
}

const prefetchProductData = async ({
  queryClient,
  productId
}: {
  queryClient: QueryClient;
  productId: string | undefined;
}) => {
  const queryKeyConfig = queryKeys.product.detail(productId || "");
  await queryClient.prefetchQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn
  });
};

export default async function ProductEditPageContainer({ productId }: IProps) {
  const queryClient = new QueryClient();

  await prefetchProductData({ queryClient, productId });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductEditPage />
    </HydrationBoundary>
  );
}
