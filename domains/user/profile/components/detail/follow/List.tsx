import useFollowListInfiniteQuery from "../../../hooks/queries/useFollowListInfiniteQuery";
import { ProfileData } from "../../../types/profileTypes";
import FollowItem from "./Item";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import ItemSkeletonUI from "./ItemSkeletonUI";

interface IProps {
  isFollowers: boolean;
  profileData: ProfileData | undefined;
}

export default function List({ isFollowers, profileData }: IProps) {
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
            {data?.map((item) => <FollowItem key={item.uid} data={item} />)}
            {isFetchingNextPage &&
              Array(8)
                .fill("")
                .map((_, index) => <ItemSkeletonUI key={index} />)}
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
