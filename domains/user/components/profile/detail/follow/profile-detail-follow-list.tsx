import useFollowListInfiniteQuery from "@/domains/user/hooks/profile/queries/useFollowListInfiniteQuery";
import { ProfileData } from "@/domains/user/types/profile-types";
import ProfileDetailFollowItem from "./profile-detail-follow-Item";
import useInfiniteScrollObserver from "@/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/InfiniteScrollEndMessage";
import ProfileDetailFollowItemSkeletonUI from "./profile-detail-follow-item-skeletonUI";

interface IProps {
  isFollowers: boolean;
  profileData: ProfileData | undefined;
}

export default function ProfileDetailFollowList({
  isFollowers,
  profileData
}: IProps) {
  const userIds = isFollowers
    ? profileData?.followers
    : profileData?.followings;
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useFollowListInfiniteQuery({
      isFollowers,
      userIds,
      uid: profileData?.uid
    });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  return (
    <>
      <ul className="grid gap-8 grid-cols-autoFill_180">
        {
          <>
            {data?.map((item) => (
              <ProfileDetailFollowItem key={item.uid} data={item} />
            ))}
            {isFetchingNextPage &&
              Array(8)
                .fill("")
                .map((_, index) => (
                  <ProfileDetailFollowItemSkeletonUI key={index} />
                ))}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        }
      </ul>
      <InfiniteScrollEndMessage
        message={`더 이상 ${isFollowers ? "팔로워" : "팔로잉"} 유저가 없어요.`}
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
