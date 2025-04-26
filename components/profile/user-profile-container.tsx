import { queryKeys } from "@/query-keys/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import React from "react";
import ProfilePage from "./profile-page";

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
      <ProfilePage />
    </HydrationBoundary>
  );
}
