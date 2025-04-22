import { queryKeys } from "@/query-keys/query-keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import React from "react";
import ProfilePage from "./profile-page";

interface IProps {
  params: { uid: string };
}
export default async function UserProfileContainer({ params }: IProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.profile.user(params.uid).queryKey,
    queryFn: queryKeys.profile.user(params.uid).queryFn
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage />
    </HydrationBoundary>
  );
}
