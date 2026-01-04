import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ProfileDetailSkeletonUI from "./detail/ProfileDetailSkeletonUI";
import UserProfilePage from "./UserProfilePage";
import Empty from "@/shared/common/components/Empty";

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
        errorFallback={<Empty message={"존재하지 않는 유저입니다."} />}
      >
        <UserProfilePage />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
