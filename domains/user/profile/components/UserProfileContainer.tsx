import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import React from "react";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ProfileDetailSkeletonUI from "./detail/ProfileDetailSkeletonUI";
import ProductListError from "@/domains/product/shared/components/product-list/ProductListError";
import UserProfilePage from "./UserProfilePage";

interface IProps {
  uid: string;
}

export default async function UserProfileContainer({ uid }: IProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.profile.user(uid).queryKey,
    queryFn: queryKeys.profile.user(uid).queryFn
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuspenseErrorBoundary
        suspenseFallback={<ProfileDetailSkeletonUI />}
        errorFallback={<ProductListError productListType="PROFILE" />}
      >
        <UserProfilePage />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
