"use client";

import type { ProfileData } from "../../../types/profileTypes";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import Empty from "@/shared/common/components/Empty";
import SkeletonUI from "./SkeletonUI";
import FollowList from "./FollowList";

type ListType = "followers" | "followings";

interface Props {
  listType: ListType;
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}

const LABEL: Record<ListType, string> = {
  followers: "팔로워",
  followings: "팔로잉"
};

export default function FollowSection({
  listType,
  profileData,
  isMyProfile
}: Props) {
  const label = LABEL[listType];
  const count =
    listType === "followers"
      ? (profileData?.followersCount ?? 0)
      : (profileData?.followingsCount ?? 0);

  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">
        {label} {count}명
      </h2>

      <SuspenseErrorBoundary
        suspenseFallback={<SkeletonUI />}
        errorFallback={
          <Empty
            message={`${label} 목록을 불러오지 못했어요.\n잠시 후 다시 시도해주세요.`}
          />
        }
      >
        <FollowList
          listType={listType}
          isMyProfile={isMyProfile}
          uid={profileData?.uid}
        />
      </SuspenseErrorBoundary>
    </div>
  );
}
