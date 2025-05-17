import { queryKeys } from "@/query-keys/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import React from "react";
import SuspenseErrorBoundary from "../commons/suspense-error-boundary";
import ProfileDetailSkeletonUI from "./detail/profile-detail-skeletonUI";
import ProductListError from "../commons/product-list/product-list-error";
import UserProfilePage from "./user-profile-page";

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
