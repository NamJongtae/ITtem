import ProductContent from "./product/ProductContent";
import ReviewContent from "./review/ReviewContent";
import WishlistContent from "./wish/WishlistContent";
import FollowingsContent from "./follow/FollowingsContent";
import FollowersContent from "./follow/FollowersContent";
import { ProfileData, ProfileMenu } from "../../types/profileTypes";

interface IProps {
  profileMenu: ProfileMenu;
  profileData: ProfileData | undefined;
  isMyProfile?: boolean;
}

export default function Content({
  profileMenu,
  profileData,
  isMyProfile
}: IProps) {
  switch (profileMenu) {
    case "판매상품": {
      return (
        <ProductContent
          profileData={profileData}
          isMyProfile={isMyProfile}
        />
      );
    }
    case "거래후기": {
      return (
        <ReviewContent
          reviewInfo={profileData?.reviewInfo}
          uid={profileData?.uid}
        />
      );
    }
    case "찜": {
      return <WishlistContent wishProductIds={profileData?.wishProductIds} />;
    }
    case "팔로잉": {
      return <FollowingsContent profileData={profileData} />;
    }
    case "팔로워": {
      return <FollowersContent profileData={profileData} />;
    }
    default: {
      return null;
    }
  }
}
