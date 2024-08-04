import Empty from "@/components/commons/empty";
import InfiniteScroll from "react-infinite-scroller";
import { isAxiosError } from "axios";
import useFollowListInfiniteQuery from "@/hooks/react-query/queries/profile/useFollowListInfiniteQuery";
import { ProfileData } from "@/types/auth-types";
import ProfileDetailFollowItem from "./profile-detail-follow-Item";
import ProfileDetailFollowSkeletonUI from "./profile-detail-follow-skeletonUI";

interface IProps {
  isFollowers: boolean;
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowList({
  isFollowers,
  userProfileData,
  myProfileData,
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
    isLoading,
  } = useFollowListInfiniteQuery({
    isFollowers,
    userIds,
    uid: userProfileData?.uid,
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
      <InfiniteScroll
        hasMore={hasNextPage && !error}
        loadMore={() => {
          if (!isFetchingNextPage) fetchNextPage();
        }}
      >
        <ul className="grid gap-8 grid-cols-autoFill_180">
          {isLoading ? (
            <ProfileDetailFollowSkeletonUI />
          ) : (
            data?.map((item) => (
              <ProfileDetailFollowItem
                key={item.uid}
                data={item}
                userProfileData={userProfileData}
                myProfileData={myProfileData}
              />
            ))
          )}
          {isFetchingNextPage && <ProfileDetailFollowSkeletonUI />}
        </ul>
      </InfiniteScroll>
    </>
  );
}
