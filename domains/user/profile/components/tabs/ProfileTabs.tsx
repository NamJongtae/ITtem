import type { ProfileData, ProfileMenu } from "../../types/profileTypes";

import ProductContent from "./product/ProductContent";
import ReviewContent from "./review/ReviewContent";
import WishlistContent from "./wish/WishlistContent";
import FollowersContent from "./follow/FollowersContent";
import FollowingsContent from "./follow/FollowingsContent";

export type ProfileTabCtx = {
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
};

export type ProfileTab = {
  key: ProfileMenu;
  label: string;
  visible?: (ctx: ProfileTabCtx) => boolean;
  render: (ctx: ProfileTabCtx) => React.ReactNode;
};

export const PROFILE_TABS: readonly ProfileTab[] = [
  {
    key: "products",
    label: "상품",
    render: ({ profileData, isMyProfile }) => (
      <ProductContent profileData={profileData} isMyProfile={isMyProfile} />
    )
  },
  {
    key: "reviews",
    label: "거래후기",
    render: ({ profileData }) => (
      <ReviewContent
        reviewInfo={profileData?.reviewInfo}
        uid={profileData?.uid}
      />
    )
  },
  {
    key: "wishlist",
    label: "찜",
    visible: ({ isMyProfile }) => isMyProfile,
    render: ({ profileData }) => (
      <WishlistContent wishCount={profileData?.wishCount} />
    )
  },
  {
    key: "followers",
    label: "팔로우",
    render: ({ profileData, isMyProfile }) => (
      <FollowersContent profileData={profileData} isMyProfile={isMyProfile} />
    )
  },
  {
    key: "followings",
    label: "팔로잉",
    render: ({ profileData, isMyProfile }) => (
      <FollowingsContent profileData={profileData} isMyProfile={isMyProfile} />
    )
  }
] as const;
