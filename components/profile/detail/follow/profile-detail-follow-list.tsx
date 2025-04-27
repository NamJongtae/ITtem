import Empty from "@/components/commons/empty";
import { isAxiosError } from "axios";
import useFollowListInfiniteQuery from "@/hooks/react-query/queries/profile/useFollowListInfiniteQuery";
import { ProfileData } from "@/types/auth-types";
import ProfileDetailFollowItem from "./profile-detail-follow-Item";
import ProfileDetailFollowSkeletonUI from "./profile-detail-follow-skeletonUI";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/commons/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/commons/InfiniteScrollEndMessage";

interface IProps {
  isFollowers: boolean;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowList({
  isFollowers,
  userProfileData,
  myProfileData
}: IProps) {
  const userIds = isFollowers
    ? userProfileData?.followers
    : userProfileData?.followings;
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    isLoading
  } = useFollowListInfiniteQuery({
    isFollowers,
    userIds,
    uid: userProfileData?.uid
  });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  if (error && !data) {
    <Empty
      message={
        isAxiosError<{ message: string }>(error)
          ? error.response?.data.message || ""
          : ""
      }
    />;
  }
  if (data?.length === 0) {
    return (
      <Empty message={`${isFollowers ? "팔로워" : "팔로잉"} 목록이 없어요.`} />
    );
  }

  return (
    <>
      <ul className="grid gap-8 grid-cols-autoFill_180">
        {isLoading ? (
          <ProfileDetailFollowSkeletonUI />
        ) : (
          <>
            {data?.map((item) => (
              <ProfileDetailFollowItem
                key={item.uid}
                data={item}
                userProfileData={userProfileData}
                myProfileData={myProfileData}
              />
            ))}
            {isFetchingNextPage && <ProfileDetailFollowSkeletonUI />}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        )}
      </ul>
      <InfiniteScrollEndMessage
        message={`더 이상 ${isFollowers ? "팔로워" : "팔로잉"} 유저가 없어요.`}
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
