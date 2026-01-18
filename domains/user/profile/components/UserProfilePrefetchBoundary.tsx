import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ProfileTabsSSRSkeletonUI from "./tabs/ProfileTabsSSRSkeletonUI";
import UserProfileScreen from "./UserProfileScreen";
import Empty from "@/shared/common/components/Empty";
import UserInfoSkeletonUI from "./user-info/UserInfoSkeletonUI";

interface IProps {
  uid: string;
}

export default async function UserProfilePrefetchBoundary({ uid }: IProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.profile.user(uid).queryKey,
    queryFn: queryKeys.profile.user(uid).queryFn
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuspenseErrorBoundary
        suspenseFallback={
          <>
            <UserInfoSkeletonUI />
            <ProfileTabsSSRSkeletonUI isMyProfile={false} />
          </>
        }
        errorFallback={<Empty message={"유저 정보를 불러올 수 없어요."} />}
      >
        <UserProfileScreen />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
