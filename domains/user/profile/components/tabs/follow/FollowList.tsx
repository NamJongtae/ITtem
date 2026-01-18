import FollowItem from "./FollowItem";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import ItemSkeletonUI from "./ItemSkeletonUI";
import useUserFollowListInfiniteQuery from "../../../hooks/queries/useUserFollowListInfiniteQuery";
import useMyFollowListInfiniteQuery from "../../../hooks/queries/useMyFollowListInfiniteQuery";

interface IProps {
  listType: "followers" | "followings";
  isMyProfile: boolean;
  uid: string | undefined;
}

export default function FollowList({ listType, isMyProfile, uid }: IProps) {
  return isMyProfile ? (
    <UserProfileList listType={listType} uid={uid} />
  ) : (
    <MyProfileList listType={listType} />
  );
}

function UserProfileList({
  listType,
  uid
}: {
  listType: "followers" | "followings";
  uid: string | undefined;
}) {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useUserFollowListInfiniteQuery({ listType, uid });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  return (
    <>
      <ul className="grid gap-8 grid-cols-autoFill_180">
        <>
          {data?.map((item) => (
            <FollowItem key={item.uid} data={item} listType={listType} />
          ))}
          {isFetchingNextPage &&
            Array(8)
              .fill("")
              .map((_, index) => <ItemSkeletonUI key={index} />)}
          <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
        </>
      </ul>

      <InfiniteScrollEndMessage
        message={`더 이상 ${listType === "followers" ? "팔로워" : "팔로잉"} 유저가 없어요.`}
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}

function MyProfileList({ listType }: { listType: "followers" | "followings" }) {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useMyFollowListInfiniteQuery({ listType });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  return (
    <>
      <ul className="grid gap-8 grid-cols-autoFill_180">
        <>
          {data?.map((item) => (
            <FollowItem key={item.uid} data={item} listType={listType} />
          ))}
          {isFetchingNextPage &&
            Array(8)
              .fill("")
              .map((_, index) => <ItemSkeletonUI key={index} />)}
          <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
        </>
      </ul>

      <InfiniteScrollEndMessage
        message={`더 이상 ${listType === "followers" ? "팔로워" : "팔로잉"} 유저가 없어요.`}
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
