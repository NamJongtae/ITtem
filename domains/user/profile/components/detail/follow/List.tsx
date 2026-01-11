import { ProfileData } from "../../../types/profileTypes";
import FollowItem from "./Item";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import ItemSkeletonUI from "./ItemSkeletonUI";
import useUserFollowListInfiniteQuery from "../../../hooks/queries/useUserFollowListInfiniteQuery";
import { useParams } from "next/navigation";
import useMyFollowListInfiniteQuery from "../../../hooks/queries/useMyFollowListInfiniteQuery";

interface IProps {
  listType: "followers" | "followings";
  profileData: ProfileData | undefined;
}

export default function List({ listType, profileData }: IProps) {
  const { uid } = useParams();

  const isUserProfilePage = !!uid;

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    isUserProfilePage
      ? useUserFollowListInfiniteQuery({ listType, uid: profileData?.uid })
      : useMyFollowListInfiniteQuery({ listType });

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
              <FollowItem key={item.uid} data={item} listType={listType} />
            ))}
            {isFetchingNextPage &&
              Array(8)
                .fill("")
                .map((_, index) => <ItemSkeletonUI key={index} />)}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        }
      </ul>
      <InfiniteScrollEndMessage
        message={`더 이상 ${listType === "followers" ? "팔로워" : "팔로잉"} 유저가 없어요.`}
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
